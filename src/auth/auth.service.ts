import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";

import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday email tizimda mavjud!");
    }
    const newUser = await this.usersService.create(createUserDto);
    return { message: "Foydalanuvchi qo'shildi!", userId: newUser.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException("Email yoki parol noto'g'ri!");
    }
    if (!user.is_active) {
      throw new BadRequestException("Avval emailni tasdiqlang!");
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.hashed_password
    );

    const { accessToken, refreshToken } = await this.generateTokens(user);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();
    return {
      message: "Tizimga xush kelibsiz!",
      accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User not verified!");
    }
    const hashed_refresh_token = "";
    await this.usersService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out succesfully!",
    };
    return response;
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode((refresh_token));
    console.log(userId);
    console.log(decodedToken["id"]);

    if (userId !== decodedToken["id"]) {
        throw new ForbiddenException("Ruxsat etilmagan!");
    }
    const user = await this.usersService.findOne(userId)
    console.log(user);
    if (!user && !user!.hashed_refresh_token) {
        throw new NotFoundException("User not found");
    }

    const tokenMatch = await bcrypt.compare(
        refresh_token,
        user!.hashed_refresh_token
    );
    if (!tokenMatch) {
        throw new ForbiddenException("Forbidden");
    }

    const {accessToken, refreshToken} = await this.generateTokens(user!);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7)
    await this.usersService.updateRefreshToken(user!.id, hashed_refresh_token);

    res.cookie("refresh_token", refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true
    });

    const response = {
        message: "User refreshed",
        userId: user!.id,
        access_token: accessToken
    }
    return response;
  }
}

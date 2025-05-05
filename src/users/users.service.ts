import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import * as otpGenerator from "otp-generator";
import { MailService } from "../mail/mail.service";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { BotsService } from "../bots/bots.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly mailService: MailService,
    private readonly botService: BotsService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return newUser;
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async activateLink(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found!");
    }
    const affectedCount = await this.userModel.update(
      { is_active: true },
      { where: { activation_link: link } }
    );

    if (affectedCount[0] === 0) {
      throw new BadRequestException("User not found!");
    }
    return {
      message: "User activated succesfully!",
    };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.userModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    return updatedUser;
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;
    const ot = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // _______________________BOT__________________________
    const isSend = await this.botService.sendOtp(phone_number, ot);
    if (!isSend) {
      throw new BadRequestException("Avval botdan ro'yxatdan o'tgansiz!");
    }
    return { message: `Otp botga yuborildi!` };
    // _______________________SMS__________________________
    // ______________________EMAIL_________________________
  }
}

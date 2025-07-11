import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix("api");

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "http://skidkachi.uz",
          "http://api.skidkachi.uz",
          "http://skidkachi.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"))
        }
      },
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true, // cookie va header
    });

    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle("Skidkachi project")
      .setDescription("NestJs Api")
      .setVersion("1.0")
      .addTag("Swagger, Validation, Send email, Bot, Tokens")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();


// git hubga push qilish

// git add .
// git commit -m "message"
// git push
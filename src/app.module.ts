import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { BotsModule } from "./bots/bots.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { TypeModule } from "./type/type.module";
import { Type } from "./type/models/type.model";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/models/category.model";
import { SocialMediaTypeModule } from "./social_media_type/social_media_type.module";
import { SocialMediaType } from "./social_media_type/models/social_media_type.model";
import { StoreSocialLinksModule } from "./store_social_links/store_social_links.module";
import { StoreSocialLink } from "./store_social_links/models/store_social_link.model";
import { DiscountsModule } from "./discounts/discounts.module";
import { Discount } from "./discounts/models/discount.model";
import { RegionModule } from "./region/region.module";
import { Region } from "./region/models/region.model";
import { DistrictModule } from "./district/district.module";
import { District } from "./district/models/district.model";
import { StatusModule } from "./status/status.module";
import { Status } from "./status/models/status.model";
import { StoreModule } from "./store/store.module";
import { Store } from "./store/models/store.model";
import { AdminsModule } from './admins/admins.module';
import { Admin } from "./admins/models/admin.model";
import { Bot } from "./bots/model/bot.model";
import { AdsModule } from './ads/ads.module';
import { Ad } from "./ads/models/ad.model";
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from "./reviews/models/review.model";
import { FavouritesModule } from './favourites/favourites.module';
import { Favourite } from "./favourites/models/favourite.model";
import { StoreSubscribesModule } from './store_subscribes/store_subscribes.module';
import { StoreSubscribe } from "./store_subscribes/models/store_subscribe.model";
import { MediaModule } from './media/media.module';
import { Media } from "./media/models/media.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotsModule],
      }),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Type,
        Category,
        SocialMediaType,
        StoreSocialLink,
        Discount,
        Region,
        District,
        Status,
        Store,
        Admin,
        Bot,
        Ad,
        Review,
        Favourite,
        StoreSubscribe,
        Media
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    BotsModule,
    TypeModule,
    CategoryModule,
    SocialMediaTypeModule,
    StoreSocialLinksModule,
    DiscountsModule,
    RegionModule,
    DistrictModule,
    StatusModule,
    StoreModule,
    AdminsModule,
    AdsModule,
    ReviewsModule,
    FavouritesModule,
    StoreSubscribesModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './model/bot.model';

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  controllers: [],
  providers: [BotsService, BotUpdate],
  exports: [BotsService],
})
export class BotsModule {}

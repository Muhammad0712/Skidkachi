import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { Favourite } from './models/favourite.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Favourite])],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}

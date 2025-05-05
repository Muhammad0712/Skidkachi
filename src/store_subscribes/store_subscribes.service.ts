import { Injectable } from '@nestjs/common';
import { CreateStoreSubscribeDto } from './dto/create-store_subscribe.dto';
import { UpdateStoreSubscribeDto } from './dto/update-store_subscribe.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StoreSubscribe } from './models/store_subscribe.model';

@Injectable()
export class StoreSubscribesService {
  constructor(@InjectModel(StoreSubscribe) private storeSubscribeModel: typeof StoreSubscribe) {}
  create(createStoreSubscribeDto: CreateStoreSubscribeDto) {
    return this.storeSubscribeModel.create(createStoreSubscribeDto);
  }

  findAll() {
    return this.storeSubscribeModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.storeSubscribeModel.findByPk(id);
  }

  update(id: number, updateStoreSubscribeDto: UpdateStoreSubscribeDto) {
    return this.storeSubscribeModel.update(updateStoreSubscribeDto, { where: { id } });
  }

  remove(id: number) {
    return this.storeSubscribeModel.destroy({ where: { id } });
  }
}

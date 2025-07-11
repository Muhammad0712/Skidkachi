import { Injectable } from '@nestjs/common';
import { CreateSocialMediaTypeDto } from './dto/create-social_media_type.dto';
import { UpdateSocialMediaTypeDto } from './dto/update-social_media_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialMediaType } from './models/social_media_type.model';

@Injectable()
export class SocialMediaTypeService {
  constructor(@InjectModel(SocialMediaType) private socialMediaTypeModel: typeof SocialMediaType) {}
  create(createSocialMediaTypeDto: CreateSocialMediaTypeDto) {
    return this.socialMediaTypeModel.create(createSocialMediaTypeDto);
  }

  findAll() {
    return this.socialMediaTypeModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.socialMediaTypeModel.findByPk(id);
  }

  update(id: number, updateSocialMediaTypeDto: UpdateSocialMediaTypeDto) {
    return this.socialMediaTypeModel.update(updateSocialMediaTypeDto, { where: { id } });
  }

  remove(id: number) {
    return this.socialMediaTypeModel.destroy({ where: { id } });
  }
}

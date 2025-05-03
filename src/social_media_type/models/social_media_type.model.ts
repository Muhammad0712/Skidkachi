import { Column, DataType, Model } from "sequelize-typescript";

interface ISocialMediaTypeCreationAttr{
    based_url: string;
    is_active: boolean;
}

export class SocialMediaType extends Model< SocialMediaType, ISocialMediaTypeCreationAttr > {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare based_url: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}

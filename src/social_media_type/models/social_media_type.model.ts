import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISocialMediaTypeCreationAttr{
    based_url: string;
    is_active: boolean;
}

@Table({ tableName: "social_media_type", timestamps: false })
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

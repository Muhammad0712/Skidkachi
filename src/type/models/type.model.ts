import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ITypeCreationAttr{
    name: string;
    description: string;
}

@Table({ tableName: "types", timestamps: false })
export class Type extends Model<Type, ITypeCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;
}

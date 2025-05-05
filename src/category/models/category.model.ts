import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

interface ICategoryCreationAttr{
    name: string;
    description: string;
    parentId: number;
}

@Table({tableName: "categories", timestamps: false})
export class Category extends Model<Category, ICategoryCreationAttr> {
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  declare parentId: number;

  @BelongsTo(() => Category)

  declare parent?: Category;

  @HasMany(() => Category)
  declare children?: Category[];
}

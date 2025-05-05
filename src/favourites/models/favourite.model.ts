import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IFavouriteCreationAttr {
    userId: number;
    discountId: number;
}

@Table({ tableName: "favourites", timestamps: false })
export class Favourite extends Model<Favourite, IFavouriteCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare userId: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare discountId: number;
}

import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStoreSubscribeCreationAttr {
  userId: number;
  storeId: number;
}

@Table({ tableName: "store_subscribes", timestamps: false })
export class StoreSubscribe extends Model<StoreSubscribe, IStoreSubscribeCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.INTEGER
    })
    declare userId: number;

    @Column({
        type: DataType.INTEGER
    })
    declare storeId: number;
}

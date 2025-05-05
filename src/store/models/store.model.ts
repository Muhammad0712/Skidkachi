import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStoreCreationAttr {
    name: string;
    location: string;
    phone: string;
    owner_id: number;
    description: string;
    region_id: number;
    district_id: number;
    address: string;
    status_id: number;
    opening_time: Date;
    closing_time: Date;
    weekday: number;
}

@Table({ tableName: "stores", timestamps: false })
export class Store extends Model<Store, IStoreCreationAttr> {
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
    declare location: string;

    @Column({
        type: DataType.STRING,
    })
    declare phone: string;

    @Column({
        type: DataType.INTEGER,
    })
    declare owner_id: number;

    @Column({
        type: DataType.STRING,
    })
    declare description: string;

    @Column({
        type: DataType.INTEGER,
    })
    declare region_id: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare district_id: number;

    @Column({
        type: DataType.STRING,
    })
    declare address: string;

    @Column({
        type: DataType.INTEGER,
    })
    declare status_id: number;

    @Column({
        type: DataType.DATE,
    })
    declare opening_time: Date;

    @Column({
        type: DataType.DATE,
    })
    declare closing_time: Date;

    @Column({
        type: DataType.INTEGER,
    })
    declare weekday: number;
}

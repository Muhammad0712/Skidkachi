import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IDiscountCreationAttr {
    store_id: number;
    title: string;
    description: string;
    discount_percent: number;
    start_date: Date;
    end_date: Date;
    category_id: number;
    discount_value: number;
    special_link: string;
    is_active: boolean;
    type_id: number;
}

@Table({ tableName: 'discounts', timestamps: false })
export class Discount extends Model<Discount, IDiscountCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare store_id: number;

    @Column({
        type: DataType.STRING,
    })
    declare title: string;

    @Column({
        type: DataType.TEXT,
    })
    declare description: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    declare discount_percent: number;

    @Column({
        type: DataType.DATE,
    })
    declare start_date: Date;

    @Column({
        type: DataType.DATE,
    })
    declare end_date: Date;

    @Column({
        type: DataType.INTEGER,
    })
    declare category_id: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    declare discount_value: number;

    @Column({
        type: DataType.STRING,
    })
    declare special_link: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    declare is_active: boolean;
}

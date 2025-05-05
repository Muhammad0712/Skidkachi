import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStatusCreationAttr {
    name: string;
    description: string;
}

@Table({ tableName: 'status', timestamps: false })
export class Status extends Model<Status, IStatusCreationAttr> {

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
        type: DataType.TEXT,
    })
    declare description: string;
}

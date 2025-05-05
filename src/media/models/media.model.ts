import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMediaCreationAttr {
    name: string;
    file: string;
    table_name: string;
    table_id: number;
}

@Table({ tableName: "media", timestamps: false })
export class Media extends Model<Media, IMediaCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING
    })
    declare name: string;

    @Column({
        type: DataType.STRING
    })
    declare file: string;

    @Column({
        type: DataType.STRING
    })
    declare table_name: string;

    @Column({
        type: DataType.INTEGER
    })
    declare table_id: number;
}

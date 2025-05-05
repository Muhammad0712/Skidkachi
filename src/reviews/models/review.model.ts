import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IReviewCreationAttr{
    disCountId: number;
    userId: number;
    comment: string;
    reting: number;
}

@Table({tableName: 'reviews', timestamps: false})
export class Review extends Model<Review, IReviewCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.INTEGER
    })
    declare disCountId: number;

    @Column({
        type: DataType.INTEGER
    })
    declare userId: number;

    @Column({
        type: DataType.TEXT
    })
    declare comment: string;

    @Column({
        type: DataType.SMALLINT
    })
    declare reting: number;
}

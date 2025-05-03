import { Column, DataType, Model } from "sequelize-typescript";

interface IRegionCreationAttr {
    name: string;
}

export class Region extends Model<Region, IRegionCreationAttr> {

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
}

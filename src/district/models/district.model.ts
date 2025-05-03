import { Column, DataType, Model } from "sequelize-typescript";
import { CreateDistrictDto } from "../dto/create-district.dto";

interface IDistrictCreationAttr {
    name: string;
    region_id: number
}

export class District extends Model<District, IDistrictCreationAttr> {
    
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
        type: DataType.INTEGER
    })
    declare region_id: number
}

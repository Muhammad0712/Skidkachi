import { Column, DataType, Model } from "sequelize-typescript";

interface IAdminCreationAttr {
    fullname: string;
    username: string;
    email: string;
    hashed_password: string;
    hashed_refresh_token: string;
    is_creator: boolean;
    is_active: boolean;
}
export class Admin extends Model<Admin, IAdminCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare fullname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare hashed_password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare hashed_refresh_token: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare is_creator: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare is_active: boolean;
}

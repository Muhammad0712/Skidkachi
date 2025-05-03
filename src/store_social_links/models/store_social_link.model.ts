import { Column, DataType, Model } from "sequelize-typescript";

interface IStoreSocialLinkCreationAttr {
    url: string;
    description: string;
    store_id: number;
    social_media_type_id: number;
}

export class StoreSocialLink extends Model<StoreSocialLink, IStoreSocialLinkCreationAttr> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
    })
    declare url: string;

    @Column({
        type: DataType.TEXT,
    })
    declare description: string;

    @Column({
        type: DataType.INTEGER,
    })
    declare store_id: number;
    
    @Column({
        type: DataType.INTEGER,
    })
    declare social_media_type_id: number;
}

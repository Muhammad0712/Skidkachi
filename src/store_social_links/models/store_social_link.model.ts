import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStoreSocialLinkCreationAttr {
    url: string;
    description: string;
    store_id: number;
    social_media_type_id: number;
}

@Table({ tableName: "store_social_links", timestamps: false })
export class StoreSocialLink extends Model<StoreSocialLink, IStoreSocialLinkCreationAttr> {
    @Column({
        type: DataType.INTEGER,
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

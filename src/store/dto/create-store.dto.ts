export class CreateStoreDto {
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

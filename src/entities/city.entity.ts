import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('city')
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: String})
    cityName: string;
    @Column({type: String})
    country: string;
}
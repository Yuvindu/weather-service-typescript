import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('city')
export class City extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    cityName: string;

    @Column({ type: 'float', nullable: true }) 
    temperature: number;

    @Column({ type: 'float', nullable: true }) 
    humidity: number;

    @Column({ type: 'float', nullable: true }) 
    pressure: number;

    @Column({ type: 'float', nullable: true }) 
    windSpeed: number;

    @Column({ type: 'float', nullable: true })
    windDirection: number;

    @Column({ type: 'varchar', nullable: true }) 
    description: string;

}

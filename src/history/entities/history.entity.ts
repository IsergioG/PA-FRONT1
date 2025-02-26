import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class History {
      @PrimaryGeneratedColumn()
    id:number
    @Column({type:'varchar'})
    name:string
    @Column({type:'int'})
    age:number
    @Column({type:'varchar'})
    city:string
    @Column({type:'varchar'})
    state:string
    @Column({type:'date'})
    contractDate:Date
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    UpdateActulization:Date
}

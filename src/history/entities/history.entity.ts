import { Column, Entity } from "typeorm";

@Entity()
export class History {
    id:number
    @Column({type:'varchar',unique:true})
    name:string
    @Column({type:'varchar'})
    age:number
    @Column({type:'varchar'})
    city:string
    @Column({type:'date'})
    state:Date
    @Column({type:'date'})
    contractDate:Date
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    UpdateActulization:Date
}

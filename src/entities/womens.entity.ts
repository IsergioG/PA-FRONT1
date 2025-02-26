import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
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
}

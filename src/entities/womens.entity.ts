import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WomenEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column({type:'varchar',unique:true})
    name:string
    @Column({type:'int'})
    age:number
    @Column({type:'varchar'})
    city:string
    @Column({type:'varchar'})
    state:string
    @Column({type:'date'})
    contractDate:Date
    @DeleteDateColumn() // Columna para Soft Delete
    deletedAt?: Date; // Puede ser opcional (?:)
}

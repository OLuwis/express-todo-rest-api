import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class Todos {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    todoTitle: string

    @Column({ length: 300 })
    todoDesc: string

    @Index()
    @Column()
    todoUserId: number

    @Column()
    todoCompleted: boolean
};
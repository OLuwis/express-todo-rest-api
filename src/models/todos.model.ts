import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ name: "Todos" })
export class Todos {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    todo: string

    @Index()
    @Column()
    todoUserId: number

    @Column({ default: false })
    todoCompleted: boolean
};
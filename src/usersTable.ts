import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Users" })
export class Users {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({ length: 20 })
    username: string

    @Column({ type: "int" })
    password: number
};
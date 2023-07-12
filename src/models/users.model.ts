import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Users" })
export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({ length: 20 })
    username: string

    @Column({ length: 30 })
    salt: string
    
    @Column({ length: 100 })
    password: string
};
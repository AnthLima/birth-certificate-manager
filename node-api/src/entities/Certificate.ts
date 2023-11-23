import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("certificates")
export class Certificate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    cpf: string;

    @Column()
    phoneNumber: string;

    @Column()
    birthDate: string;

    @Column()
    city: string;
    
    @Column()
    state: string;

    @Column()
    publicArea: string;

    @Column()
    typeOfCertificate: string;

    @Column()
    nameOfFile: string;

    @Column()
    idOfUser: string;

    @Column()
    status: string;

}

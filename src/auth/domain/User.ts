import { Animal } from '../../animal/domain/Animal';

export class User {
    public id: string; 
    public name: string;
    public lastname: string;
    public email: string;
    public password: string;
    public animals: Animal[] = [];

    public constructor(id: string, name: string, lastname: string, email: string, password: string, animals: Animal[] = []) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.animals = animals;
    }
}

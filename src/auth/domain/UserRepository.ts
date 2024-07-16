import { User } from "./User";

export interface UserRepository {
    register(user: User): Promise<void>;
    login(email: string, password: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    logout(id:string):Promise<void>
}



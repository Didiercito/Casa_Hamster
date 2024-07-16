import { dbMongo } from "../../../../database/mongo/mongodb";
import { User } from "../../../domain/User";
import { UserRepository } from "../../../domain/UserRepository";
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'; // Importar ObjectId desde 'mongodb'

export class MongodbUserRepository implements UserRepository {

    async register(user: User): Promise<void> {
        const userCollection = dbMongo.collection('users');
        await userCollection.insertOne(user);
    }

    async login(email: string, password: string): Promise<User | null> {
        const userCollection = dbMongo.collection('users');
        const user = await userCollection.findOne({ email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return new User(user._id.toString(), user.name, user.lastname, user.email, user.password, user.animals);
            }
        }
        
        return null;
    }

    async getAllUsers(): Promise<User[]> {
        const userCollection = dbMongo.collection('users');
        const users = await userCollection.find().toArray();
        return users.map(user => new User(
            user._id.toString(),
            user.name,
            user.lastname,
            user.email,
            user.password,
            user.animals
        ));
    }

    async logout(id: string): Promise<void> {
        const userCollection = dbMongo.collection('users');
        await userCollection.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { token: null } } 
        );
    }
}

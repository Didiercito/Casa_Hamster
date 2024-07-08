import { testConnection } from '../../../../database/mysql/mysqldb';
import { User } from '../../../domain/User';
import { UserRepository } from '../../../domain/UserRepository';
import bcrypt from 'bcrypt';

export class MysqlUserRepository implements UserRepository {
    async register(user: User): Promise<void> {
        const connection = await testConnection();
        const sql = 'INSERT INTO users (id, name, lastname, email, password) VALUES (?, ?, ?, ?, ?)';
        await connection.execute(sql, [user.id, user.name, user.lastname, user.email, user.password]);
    }

    async login(email: string, password: string): Promise<User | null> {
        const connection = await testConnection();
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await connection.execute(sql, [email]);
        const users = rows as any[];

        if (users.length === 0) {
            return null;
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        return new User(user.id, user.name, user.lastname, user.email, user.password, user.animals);
    }

    async getAllUsers(): Promise<User[]> {
        const connection = await testConnection();
        const sql = 'SELECT * FROM users';
        const [rows] = await connection.execute(sql);
        const users = rows as any[];

        return users.map(user => new User(
            user.id,
            user.name,
            user.lastname,
            user.email,
            user.password,
            user.animals
        ));
    }
}

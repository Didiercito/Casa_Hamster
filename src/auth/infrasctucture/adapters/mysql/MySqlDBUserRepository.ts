import { User } from '../../../domain/User';
import { UserRepository } from '../../../domain/UserRepository';
import { testConnection } from '../../../../database/mysql/mysqldb';

export class MysqlUserRepository implements UserRepository {
    async register(user: User): Promise<void> {
        const connection = await testConnection();
    

        const sql = 'INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)';
        await connection.execute(sql, [user.name, user.lastname, user.email, user.password]);
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
        return new User(user.id, user.name, user.lastname, user.email, user.password, user.animals, user.token);
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
            user.animals,
            user.token
        ));
    }

    async logout(token: string): Promise<void> {
        const connection = await testConnection();
        const sql = 'UPDATE users SET token = NULL WHERE token = ?'; 
        await connection.execute(sql, [token]);
    }

    async updateToken(id: string, token: string | null): Promise<void> {
        const connection = await testConnection();
        const sql = 'UPDATE users SET token = ? WHERE id = ?';
        await connection.execute(sql, [token, id]);
    }
}

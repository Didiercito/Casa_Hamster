import { DHT11 } from "../../../domain/dht11";
import { DHT11Repository } from "../../../domain/dht11Repository";
import { testConnection } from "../../../../database/mysql/mysqldb";

export class MySQLDHT11Repository implements DHT11Repository {
    async readSensorData(id: number): Promise<{ temperature: number; humidity: number }> {
        const connection = await testConnection();
        const [rows] = await connection.query('SELECT temperature, humidity FROM dht11 WHERE id = ?', [id]);

        if ((rows as any[]).length === 0) {
            throw new Error('Sensor not found');
        }

        const sensorData = (rows as any[])[0] as { temperature: number; humidity: number };
        console.log(`Read sensor data: ID ${id}, Temperature ${sensorData.temperature}, Humidity ${sensorData.humidity}`);
        return { temperature: sensorData.temperature, humidity: sensorData.humidity };
    }

    async updateSensorData(id: number): Promise<void> {
        const connection = await testConnection();
        const newData = this.readSensor();

        await connection.query('UPDATE dht11 SET temperature = ?, humidity = ? WHERE id = ?', [newData.temperature, newData.humidity, id]);
        console.log(`Updated sensor data: ID ${id}, Temperature ${newData.temperature}, Humidity ${newData.humidity}`);
    }

    async getSensorData(id: number): Promise<DHT11> {
        const connection = await testConnection();
        const [rows] = await connection.query('SELECT * FROM dht11 WHERE id = ?', [id]);

        if ((rows as any[]).length === 0) {
            throw new Error('Sensor not found');
        }

        const sensorData = (rows as any[])[0] as { id: number; temperature: number; humidity: number };
        console.log(`Fetched sensor data: ID ${sensorData.id}, Temperature ${sensorData.temperature}, Humidity ${sensorData.humidity}`);
        return new DHT11(sensorData.id, sensorData.temperature, sensorData.humidity);
    }

    async initializeSensorData(id: number, temperature: number, humidity: number): Promise<void> {
        const connection = await testConnection();
        const [rows] = await connection.query('SELECT * FROM dht11 WHERE id = ?', [id]);

        if ((rows as any[]).length === 0) {
            await connection.query('INSERT INTO dht11 (id, temperature, humidity) VALUES (?, ?, ?)', [id, temperature, humidity]);
            console.log(`Initialized sensor data: ID ${id}, Temperature ${temperature}, Humidity ${humidity}`);
        }
    }

    private readSensor(): { temperature: number; humidity: number } {
        const temperature = Math.random() * (50 - 0) + 0;
        const humidity = Math.random() * (90 - 20) + 20;
        console.log(`Generated fake sensor data: Temperature ${temperature}, Humidity ${humidity}`);
        return { temperature, humidity };
    }
}

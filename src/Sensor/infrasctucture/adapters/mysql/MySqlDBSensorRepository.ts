import { testConnection } from "../../../../database/mysql/mysqldb";
import {Sensor} from '../../../domain/Sensor';
import {SensorRepository} from '../../../domain/SensorRepository';

export class MysqlSensorRepository implements SensorRepository{
    async getAll(): Promise<Sensor[]> {
        const connection = await testConnection();
        const sql='SELECT * FROM Sensors';
        const [rows]= await connection.execute(sql);
        const sensors = rows as any[];
        return sensors.map(sensor=> new Sensor(
            sensor.id,
            sensor.humidity,
            sensor.temperature,
            sensor.distance,
            sensor.ldrValue,
            sensor.dayOrNight,
        ));
    }

    async registerSensor(sensor: Sensor): Promise<void> {
        const connection= await testConnection();
        const sql = 'INSERT INTO sensors (id,humidity,temperature,distance,ldrValue,dayOrNight) VALUES (?,?,?,?,?,?)';
        await connection.execute(sql,[sensor.id,sensor.humidity,sensor.temperature,sensor.distance,sensor.ldrValue,sensor.dayOrNight]);
    }

    async getById(id: string): Promise<Sensor | null> {
        const connection = await testConnection();
        const sql = 'SELECT * FROM sensors WHERE id = ?';
        const [rows]=await connection.execute(sql,[id]);
        const sensors = rows as any[];

        if (sensors.length ===0){
            return null;
        }

        const sensor=sensors[0];
        return new Sensor(
            sensor.id,
            sensor.humidity,
            sensor.temperature,
            sensor.distance,
            sensor.ldrValue,
            sensor.dayOrNight,
        );
    }

    async getSensorsByOwnerId(ownerId: string): Promise<Sensor[]> {
        const connection= await testConnection();
        const sql = 'SELECT * FROM sensors WHERE ownerId = ?';
        const [rows]=await connection.execute(sql,[ownerId]);
        const sensors=rows as any[];

        return sensors.map(sensor => new Sensor(
            sensor.id,
            sensor.humidity,
            sensor.temperature,
            sensor.distance,
            sensor.ldrValue,
            sensor.dayOrNight,
        ))
    }
}

import { DHT11 } from "../../../domain/dht11";
import { DHT11Repository } from "../../../domain/dht11Repository";
import { dbMongo } from "../../../../database/mongo/mongodb";

export class MongoDHT11Repository implements DHT11Repository {
    async readSensorData(id: number): Promise<{ temperature: number; humidity: number }> {
        const sensorCollection = dbMongo.collection('dht11');
        const sensor = await sensorCollection.findOne({ id });

        if (!sensor) {
            throw new Error('Sensor not found');
        }

        return { temperature: sensor.temperature, humidity: sensor.humidity };
    }

    async updateSensorData(id: number): Promise<void> {
        const sensorCollection = dbMongo.collection('dht11');
        const sensor = await sensorCollection.findOne({ id });

        if (!sensor) {
            throw new Error('Sensor not found');
        }

        const newData = this.readSensor();

        await sensorCollection.updateOne(
            { id },
            { $set: { temperature: newData.temperature, humidity: newData.humidity } }
        );
    }

    async getSensorData(id: number): Promise<DHT11> {
        const sensorCollection = dbMongo.collection('dht11');
        const sensor = await sensorCollection.findOne({ id });

        if (!sensor) {
            throw new Error('Sensor not found');
        }

        return new DHT11(sensor.id, sensor.temperature, sensor.humidity);
    }

    private readSensor(): { temperature: number; humidity: number } {
        const temperature = Math.random() * (50 - 0) + 0;
        const humidity = Math.random() * (90 - 20) + 20;
        return { temperature, humidity };
    }
}

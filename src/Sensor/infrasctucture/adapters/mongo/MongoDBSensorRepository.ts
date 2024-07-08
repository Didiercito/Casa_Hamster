import { dbMongo } from "../../../../database/mongo/mongodb";
import {Sensor} from "../../../domain/Sensor";
import {SensorRepository} from "../../../domain/SensorRepository";
import { ObjectId } from "mongodb";

export class MongodbSensorRepository implements SensorRepository{
    async getAll(): Promise<Sensor[]> {
        const sensorCollection=dbMongo.collection('sensor');
        const sensor =await sensorCollection.find().toArray();
        return sensor.map(sensor => new Sensor(
            sensor._id.toString(),
            sensor.humidity,
            sensor.temperature,
            sensor.distance,
            sensor.ldrValue,
            sensor.dayOrNight,
        ));
    }

    async registerSensor(sensor: Sensor): Promise<void> {
        const sensorCollection=dbMongo.collection('sensor')
        await sensorCollection.insertOne(sensor);
    }

    async getById(id: string): Promise<Sensor | null> {
        const sensorCollection=dbMongo.collection('sensor')
        const sensor = await sensorCollection.findOne({ _id: new ObjectId(id) });
        if(sensor){
            return new Sensor(
                sensor._id.toString(),
                sensor.humidity,
                sensor.temperature,
                sensor.distance,
                sensor.ldrValue,
                sensor.dayOrNight,
            )
        }
        return null;
    }

    async getSensorsByOwnerId(ownerId: string): Promise<Sensor[]> {
        const sensorCollection=dbMongo.collection('sensors');
        const sensor = await sensorCollection.find ({ownerId}).toArray();
        return sensor.map(sensor=> new Sensor(
            sensor._id.toString(),
            sensor.humidity,
            sensor.temperature,
            sensor.distance,
            sensor.ldrValue,
            sensor.dayOrNight,
        ));
    }
}
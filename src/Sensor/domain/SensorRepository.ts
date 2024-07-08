import { Sensor } from './Sensor';

export interface SensorRepository {
    getAll(): Promise<Sensor[]>;
    registerSensor(sensor: Sensor): Promise<void>;
    getById(id: string): Promise<Sensor | null>;
    getSensorsByOwnerId(ownerId: string): Promise<Sensor[]>; 
}

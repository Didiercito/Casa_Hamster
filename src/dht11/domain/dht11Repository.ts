import { DHT11 } from "./dht11";


export interface DHT11Repository {
    readSensorData(id: number): Promise<{ temperature: number; humidity: number }>;
    updateSensorData(id: number): Promise<void>;
    getSensorData(id: number): Promise<DHT11>;
}

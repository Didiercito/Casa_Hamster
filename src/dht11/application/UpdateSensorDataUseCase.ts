import { DHT11Repository } from "../domain/dht11Repository";

export class UpDataDHT11UseCase {
    private dht11Repository: DHT11Repository; 

    constructor(dht11Repository: DHT11Repository) {
        this.dht11Repository = dht11Repository
    }

    execute(id: number): void {
        this.dht11Repository.updateSensorData(id);
    }
}
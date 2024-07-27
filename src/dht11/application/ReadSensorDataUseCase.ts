import { DHT11Repository } from "../domain/dht11Repository";

export class ReadDHT11DataUseCase {
    private dht11Repository: DHT11Repository;

    constructor(dht11Repository: DHT11Repository) {
        this.dht11Repository = dht11Repository;
    }

    async execute(id: number): Promise<{ temperature: number; humidity: number }> {
        return await this.dht11Repository.readSensorData(id);
    }
}

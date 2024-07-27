import { DHT11 } from "../domain/dht11";
import { DHT11Repository } from "../domain/dht11Repository";

export class GetDHT11DataUseCase {
    private dht11Repository: DHT11Repository;

    constructor(dht11Repository: DHT11Repository) {
        this.dht11Repository = dht11Repository;
    }

    async execute(id: number): Promise<DHT11> {
        return await this.dht11Repository.getSensorData(id);
    }
}

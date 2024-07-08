import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class RegisterSensorUseCase {
    constructor(private repository: SensorRepository) { }

    async registerSensor(sensor: Sensor, userId: string): Promise<void> {
        sensor.ownerId = userId;
        await this.repository.registerAnimal(sensor);
    }
}

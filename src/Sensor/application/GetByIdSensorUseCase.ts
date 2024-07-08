import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class GetByIdSensorUseCase {
    constructor(private repository: SensorRepository) { }

    async getById(id: string, userId: string): Promise<Sensor | null> {
        const sensor = await this.repository.getById(id);

        if (!sensor) {
            return null; 
        }

        if (sensor.ownerId !== userId) {
            throw new Error("Sensor not found or does not belong to the user.");
        }

        return sensor;
    }
}

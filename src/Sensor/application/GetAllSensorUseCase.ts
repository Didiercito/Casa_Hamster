import {SensorRepository } from "../domain/SensorRepository";

export class GetAllSensorUseCase {
    constructor(private sensorRepository: SensorRepository){}

    async getAll() {
        return await this.sensorRepository.getAll();
    }
}
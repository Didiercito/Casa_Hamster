import { Request, Response } from "express";
import { ReadDHT11DataUseCase } from "../../application/ReadSensorDataUseCase";

export class ReadDHT11Controller {
    private readDHT11DataUseCase: ReadDHT11DataUseCase;

    constructor(readDHT11DataUseCase: ReadDHT11DataUseCase) {
        this.readDHT11DataUseCase = readDHT11DataUseCase;
    }

    async readSensorData(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid sensor ID" });
                return;
            }

            const sensorData = await this.readDHT11DataUseCase.execute(id);

            res.status(200).json(sensorData);
        } catch (error) {
            console.error("Error reading sensor data:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

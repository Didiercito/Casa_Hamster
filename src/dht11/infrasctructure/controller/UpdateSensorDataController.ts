import { Request, Response } from "express";
import { UpDataDHT11UseCase } from "../../application/UpdateSensorDataUseCase";

export class UpdateDHT11Controller {
    private updateDHT11DataUseCase: UpDataDHT11UseCase;

    constructor(updateDHT11DataUseCase: UpDataDHT11UseCase) {
        this.updateDHT11DataUseCase = updateDHT11DataUseCase;
    }

    async updateSensorData(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid sensor ID" });
                return;
            }

            await this.updateDHT11DataUseCase.execute(id);

            res.status(200).json({ message: "Sensor data updated successfully" });
        } catch (error) {
            console.error("Error updating sensor data:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

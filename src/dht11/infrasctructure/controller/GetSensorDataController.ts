import { Request, Response } from "express";
import { GetDHT11DataUseCase } from "../../application/GetSensorDataUseCase";

export class GetDHT11Controller {
    private getDHT11DataUseCase: GetDHT11DataUseCase;

    constructor(getDHT11DataUseCase: GetDHT11DataUseCase) {
        this.getDHT11DataUseCase = getDHT11DataUseCase;
    }

    async getSensorData(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid sensor ID" });
                return;
            }

            const dht11Data = await this.getDHT11DataUseCase.execute(id);

            res.status(200).json(dht11Data);
        } catch (error) {
            console.error("Error fetching sensor data:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

import { Request, Response } from "express";
import { CameraOnUseCase } from "../../application/CameraOnUseCase";


export class OnController {
    constructor( private cameraOnUseCase: CameraOnUseCase) {}


    async on (req: Request, res: Response):Promise<void>{
        try {
            await this.cameraOnUseCase.execute();
            res.json({ status: 'Camera is on' });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}
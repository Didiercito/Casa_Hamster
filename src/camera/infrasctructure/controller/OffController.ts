import { Request, Response } from "express";
import { CameraOffUseCase } from "../../application/CameraOffUseCase";


export class OffController {
    constructor( private cameraOffUseCase: CameraOffUseCase) {}

    async Off (req: Request, res:Response):Promise<void>{
        try {
            await this.cameraOffUseCase.execute()
            res.status(200).json({status: 'Camera is Off'})
        } catch (error: any) {
            res.status(500).send('Internal Server Error: ');
        }
    }
}
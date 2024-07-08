import { Request,Response } from "express";
import { GetAllSensorUseCase } from "../../application/GetAllSensorUseCase"

export class GetAllSensorController{
    constructor (private getAllSensorUseCase: GetAllSensorUseCase){}
    async run(req :Request,res:Response){
        try{
            const userId=(req as any).user.id;
            const sensor= await this.getAllSensorUseCase.getAll();
            
            res.status(200).json({
                sensor,
                success:true,
            });
        }catch(error){
            const errorMessage=error instanceof Error ? error.message: 'Unknown error occurred';
            res.status(400).json({
                message: errorMessage,
                success:true,
            });
        }
    }
}
import { Request, Response } from "express";
import {GetByIdSensorUseCase}from "../../application/GetByIdSensorUseCase";

export class GetByIdSensorController{
    constructor (private getByIdSensorUseCase:GetByIdSensorUseCase){}

    async run(req:Request,res:Response){
        try{
            const {id }=req.params;
            const userId=(req as any).user.id;
            const sensor= await this.getByIdSensorUseCase.getById(id,userId);
            
            res.status(200).json({
                message:'Sensor retrieved succssfully',
                success:true,
                data:sensor,
            })
        }catch(error){
            const errorMessage=error instanceof Error ? error.message :'Unknow error ocurred';
            res.status(400).json({
                message:errorMessage,
                success:false,
            })
        }
    }
}
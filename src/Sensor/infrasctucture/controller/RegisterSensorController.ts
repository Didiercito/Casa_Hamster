import { Request, Response } from "express";
import {RegisterSensorUseCase} from "../../application/RegisterSensorUseCase";
import { Sensor } from "../../domain/Sensor";

export class RegisterSensorController{
    constructor(private registerSensorUseCase:RegisterSensorUseCase){}

    async run(req:Request,res:Response){
        try{
            const{humidity,temperature,distance,ldrValue,dayOrNight}= req.body;
            const userId=(req as any).userId.id;

            const sensor=new Sensor(
            '',
            humidity,
            temperature,
            distance,
            ldrValue,
            dayOrNight
            );
            await this.registerSensorUseCase.registerSensor(sensor,userId);
            res.status(201).json({
                message:'Sensor registered successfully',
                success:true,
            })
        }catch(error){
            const errorMessage=error instanceof Error ? error.message: 'Unknow error ocurred';
            res.status(400).json({
                message:errorMessage,
                success:false,
            })
        }
    }
}
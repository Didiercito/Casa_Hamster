import {RegisterSensorController} from "./controller/RegisterSensorController"
import {GetAllSensorController } from "./controller/GetAllSensorController";
import { GetByIdSensorController } from "./controller/GetByIdSensorController";
import { RegisterSensorUseCase } from "../application/RegisterSensorUseCase";
import { GetAllSensorUseCase } from "../application/GetAllSensorUseCase";
import { GetByIdSensorUseCase } from "../application/GetByIdSensorUseCase";
import { MysqlSensorRepository } from "./adapters/mysql/MySqlDBSensorRepository";
import { MongodbSensorRepository } from "./adapters/mongo/MongoDBSensorRepository";
import { SensorRepository } from "../domain/SensorRepository";

import dovenv from 'dotenv';
dovenv.config();

let sensorRepository : SensorRepository;
const sensorRepositoryType=process.env.DB_TYPE;


if(sensorRepositoryType === "mysql2"){
    sensorRepository=new MysqlSensorRepository();
}else{
    sensorRepository=new MongodbSensorRepository();
}

export const registerSensorUseCase= new RegisterSensorUseCase(sensorRepository);
export const getAllSensorUseCase=new GetAllSensorUseCase (sensorRepository);
export const getByIdSensorUseCase=new GetByIdSensorUseCase(sensorRepository);

export const registerSensorController=new RegisterSensorController(registerSensorUseCase);
export const getAllSensorController=new GetAllSensorController(getAllSensorUseCase);
export const getByIdSensorController=new GetByIdSensorController(getByIdSensorUseCase);
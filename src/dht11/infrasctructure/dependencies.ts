import { GetDHT11DataUseCase } from "../application/GetSensorDataUseCase";
import { ReadDHT11DataUseCase } from "../application/ReadSensorDataUseCase";
import { UpDataDHT11UseCase } from "../application/UpdateSensorDataUseCase";
import { GetDHT11Controller } from "./controller/GetSensorDataController";
import { ReadDHT11Controller } from "./controller/ReadSensorDataController";
import { UpdateDHT11Controller } from "./controller/UpdateSensorDataController";
import { DHT11Repository } from "../domain/dht11Repository";
import { MySQLDHT11Repository } from "./adapters/mysql/MySQLDHT11Repository";
import { MongoDHT11Repository } from "./adapters/mongo/MongoDBDHT11Repository";
import dotenv from 'dotenv';

dotenv.config();

let dht11Repository: DHT11Repository; 
const dht11RepositoryType = process.env.DB_TYPE;

if(dht11RepositoryType === "mysql2"){
    dht11Repository = new MySQLDHT11Repository(); 
}else{
    dht11Repository = new MongoDHT11Repository(); 
}

export const getDHT11DataUseCase = new GetDHT11DataUseCase(dht11Repository);
export const readDHT11DataUseCase = new ReadDHT11DataUseCase(dht11Repository);
export const upDataDHT11UseCase = new UpDataDHT11UseCase(dht11Repository);

export const getDHT11Controller = new GetDHT11Controller(getDHT11DataUseCase);
export const readDHT11Controller = new ReadDHT11Controller(readDHT11DataUseCase);
export const updateDHT11Controller = new UpdateDHT11Controller(upDataDHT11UseCase)
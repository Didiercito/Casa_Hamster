import { OnController } from "./controller/OnController";
import { OffController } from "./controller/OffController";
import { CameraOffUseCase } from "../application/CameraOffUseCase";
import { CameraOnUseCase } from "../application/CameraOnUseCase";
import { MysqlCameraRepository } from "./adapters/mysql/MySQLCameraRepository";
import { MongoDBCameraRepository } from "./adapters/mongo/MongoDBCameraRepository";
import { CameraRepository } from "../domain/CameraRepository";
import dotenv from 'dotenv'

dotenv.config();

let cameraRepository: CameraRepository;
const cameraRepositoryType = process.env.DB_TYPE;

if (cameraRepositoryType === "mysql2") {
    cameraRepository = new MysqlCameraRepository();
}else{
    cameraRepository = new MongoDBCameraRepository();
}


export const cameraOffUseCase = new CameraOffUseCase(cameraRepository);
export const cameraOnUseCase  = new CameraOnUseCase(cameraRepository);

export const onController = new OnController(cameraOnUseCase);
export const offController = new OffController(cameraOffUseCase);
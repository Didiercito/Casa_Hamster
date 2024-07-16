import { OnController } from "./controller/OnController";
import { OffController } from "./controller/OffController";
import { CameraOffUseCase } from "../application/CameraOffUseCase";
import { CameraOnUseCase } from "../application/CameraOnUseCase";
import { MysqlCameraRepository } from "./adapters/mysql/MySQLCameraRepository";
import { MongoDBCameraRepository } from "./adapters/mongo/MongoDBCameraRepository";
import dotenv from 'dotenv'

dotenv.config();

//queda pendiente lo de typedb
// let cameraRepository: 


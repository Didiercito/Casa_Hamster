import { RegisterAnimalController } from "./controller/RegisterAnimalController";
import { GetAllAnimalController } from "./controller/GetAllAnimalController";
import { GetByIdAnimalController } from "./controller/GetByIdAnimalController";
import { RegisterAnimalUseCase } from "../application/RegisterAnimalUseCase";
import { GetAllAnimalUseCase } from "../application/GetAllAnimalUseCase";
import { GetByIdAnimalUseCase } from "../application/GetByIdAnimalUseCase";
import { MysqlAnimalRepository } from "./adapters/mysql/MySqlDBAnimalRepository";
import {MongodbAnimalRepository} from "./adapters/mongo/MongoDBAnimalRepository";
import { AnimalRepository } from "../domain/AnimalRepository";

import dotenv from 'dotenv';
dotenv.config();

let animalRepository : AnimalRepository;
const animalRepositoryType = process.env.DB_TYPE;

if (animalRepositoryType === "mysql2") {
    animalRepository = new MysqlAnimalRepository();
}else{
    animalRepository = new MongodbAnimalRepository();
}


export const registerAnimalUseCase = new RegisterAnimalUseCase(animalRepository);
export const getAllAnimalUseCase = new GetAllAnimalUseCase(animalRepository);
export const getByIdAnimalUseCase = new GetByIdAnimalUseCase(animalRepository);

export const registerAnimalController = new RegisterAnimalController(registerAnimalUseCase);
export const getAllAnimalController = new GetAllAnimalController(getAllAnimalUseCase);
export const  getByIdAnimalController = new GetByIdAnimalController(getByIdAnimalUseCase);

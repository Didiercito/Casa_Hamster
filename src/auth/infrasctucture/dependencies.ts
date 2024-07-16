import { RegisterController } from "./controller/RegisterController";
import { LoginController } from "./controller/LoginController";
import { GetAllUsersWithAnimalsController } from "./controller/GetAllUsersWithAnimalsController";
import { LogOutController } from "./controller/LogOutController";
import { RegisterUserUseCase } from "../application/RegisterUserUserCase";
import { LoginUserUseCase } from "../application/LoginUserUseCase";
import { GetAllUsersWithAnimalsUseCase } from "../application/GetAllUsersWithAnimalsUseCase ";
import { LogOutUseCase } from "../application/LogOutUseCase";
import { MysqlUserRepository } from "../infrasctucture/adapters/mysql/MySqlDBUserRepository";
import { MongodbUserRepository } from "../infrasctucture/adapters/mongo/MongoDBUserRepository";
import { MysqlAnimalRepository } from "../../animal/infrasctucture/adapters/mysql/MySqlDBAnimalRepository"; // Importa el repositorio de animales para MySQL
import { MongodbAnimalRepository } from "../../animal/infrasctucture/adapters/mongo/MongoDBAnimalRepository"; 
import { UserRepository } from "../domain/UserRepository";
import { AnimalRepository } from "../../animal/domain/AnimalRepository";
import dotenv from 'dotenv';


dotenv.config();

let userRepository: UserRepository;
let animalRepository: AnimalRepository;
const userRepositoryType = process.env.DB_TYPE;

if (userRepositoryType === "mysql2") {
    userRepository = new MysqlUserRepository();
    animalRepository = new MysqlAnimalRepository(); 
} else {
    userRepository = new MongodbUserRepository();
    animalRepository = new MongodbAnimalRepository(); 
}

export const registerUserUseCase = new RegisterUserUseCase(userRepository);
export const loginUserUseCase = new LoginUserUseCase(userRepository);
export const logoutUseCase = new LogOutUseCase(userRepository);
export const getAllUsersWithAnimalsUseCase = new GetAllUsersWithAnimalsUseCase(userRepository, animalRepository);

export const registerController = new RegisterController(registerUserUseCase);
export const loginController = new LoginController(loginUserUseCase);
export const getAllUsersWithAnimalsController = new GetAllUsersWithAnimalsController(getAllUsersWithAnimalsUseCase);
export const logoutController = new LogOutController(logoutUseCase)
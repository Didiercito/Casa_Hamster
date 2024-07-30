"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDataDHT11Controller = exports.getDHT11ByIdController = exports.getAllDataDHT11Controller = exports.saveDHT11DataUseCase = exports.getDataDHT11UseCase = exports.getDHT11ByIdUseCase = void 0;
const GetDHT11DataByIdUseCase_1 = require("../application/GetDHT11DataByIdUseCase");
const GetDHT11DataUseCase_1 = require("../application/GetDHT11DataUseCase");
const SaveDHT11DataUseCase_1 = require("../application/SaveDHT11DataUseCase");
const GetAllDataDHT11Controller_1 = require("./controller/GetAllDataDHT11Controller");
const GetByIdDataDHT11Controller_1 = require("./controller/GetByIdDataDHT11Controller");
const SaveDataDHT11Controller_1 = require("./controller/SaveDataDHT11Controller");
const MySQLDHT11Repository_1 = require("./adapters/mysql/MySQLDHT11Repository");
const dht11Repository = new MySQLDHT11Repository_1.MySQLDHT11Repository;
exports.getDHT11ByIdUseCase = new GetDHT11DataByIdUseCase_1.GetDHT11ByIdUseCase(dht11Repository);
exports.getDataDHT11UseCase = new GetDHT11DataUseCase_1.GetDataDHT11UseCase(dht11Repository);
exports.saveDHT11DataUseCase = new SaveDHT11DataUseCase_1.SaveDHT11DataUseCase(dht11Repository);
exports.getAllDataDHT11Controller = new GetAllDataDHT11Controller_1.GetAllDataDHT11Controller(exports.getDataDHT11UseCase);
exports.getDHT11ByIdController = new GetByIdDataDHT11Controller_1.GetDHT11ByIdController(exports.getDHT11ByIdUseCase);
exports.saveDataDHT11Controller = new SaveDataDHT11Controller_1.SaveDataDHT11Controller(exports.saveDHT11DataUseCase);
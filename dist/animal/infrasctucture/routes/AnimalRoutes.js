"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalRouter = void 0;
const express_1 = require("express");
const dependencies_1 = require("../dependencies");
const Auth_1 = require("../../../middlewares/Auth");
exports.AnimalRouter = (0, express_1.Router)();
exports.AnimalRouter.post('/register', Auth_1.authenticateJWT, dependencies_1.registerAnimalController.run.bind(dependencies_1.registerAnimalController));
exports.AnimalRouter.get('/all', Auth_1.authenticateJWT, dependencies_1.getAllAnimalController.run.bind(dependencies_1.getAllAnimalController));
exports.AnimalRouter.get('/:id', Auth_1.authenticateJWT, dependencies_1.getByIdAnimalController.run.bind(dependencies_1.getByIdAnimalController));

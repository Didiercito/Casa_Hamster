"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogOutController = void 0;
class LogOutController {
    constructor(logOutUseCase) {
        this.logOutUseCase = logOutUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                res.status(400).json({ message: 'Token no proporcionado' });
                return;
            }
            try {
                yield this.logOutUseCase.execute(token);
                res.status(200).json({ message: 'Usuario ha hecho logout exitosamente' });
            }
            catch (error) {
                console.error('Error en logout:', error);
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });
    }
}
exports.LogOutController = LogOutController;

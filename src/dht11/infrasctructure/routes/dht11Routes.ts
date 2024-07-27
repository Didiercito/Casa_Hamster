import { Router } from "express";
import { getDHT11Controller,readDHT11Controller, updateDHT11Controller } from "../dependencies";

export const DHT11Router = Router()

DHT11Router.get('/:id', getDHT11Controller.getSensorData.bind(getDHT11Controller));

DHT11Router.get('/read/:id', readDHT11Controller.readSensorData.bind(readDHT11Controller));

DHT11Router.put('/update/:id', updateDHT11Controller.updateSensorData.bind(updateDHT11Controller)); 
import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { testConnection } from './src/database/mysql/mysqldb';
import { UserRouter } from './src/auth/infrasctucture/router/UserRoutes';
import { AnimalRouter } from './src/animal/infrasctucture/routes/AnimalRoutes';
import { CameraRouter } from './src/camera/infrasctructure/routes/CameraRoutes';
import { dhtRouter } from './src/dht11/infrasctructure/routes/dht11Routes';
import { MqttService } from './src/services/rabbitMQTT/RabbitMQService';
import { SaveDHT11DataUseCase } from './src/dht11/application/SaveDHT11DataUseCase';
import { MySQLDHT11Repository } from './src/dht11/infrasctructure/adapters/mysql/MySQLDHT11Repository';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/auth', UserRouter);
app.use('/api/v1/animal', AnimalRouter);
app.use('/api/v1/camera', CameraRouter);
app.use('/api/v1/dht11', dhtRouter);

// Configurar el repositorio y el caso de uso
const dht11Repository = new MySQLDHT11Repository();
const saveDHT11DataUseCase = new SaveDHT11DataUseCase(dht11Repository);

const mqttServer = process.env.MQTT_SERVER as string;
const mqttPort = parseInt(process.env.MQTT_PORT as string);
const mqttUser = process.env.MQTT_USER as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;

const mqttService = new MqttService(mqttServer, mqttPort, mqttUser, mqttPassword, saveDHT11DataUseCase);

mqttService.connect();
mqttService.onMessage((message: string) => {
  console.log('Mensaje recibido desde MQTT:', message);
});

async function startServer() {
  try {
    await testConnection();
    console.log('MySQL connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

startServer();

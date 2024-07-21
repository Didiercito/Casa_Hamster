import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { testConnection } from './src/database/mysql/mysqldb';
import { UserRouter } from './src/auth/infrasctucture/router/UserRoutes';
import { AnimalRouter } from './src/animal/infrasctucture/routes/AnimalRoutes';
import { CameraRouter } from './src/camera/infrasctructure/routes/CameraRoutes';

dotenv.config();
testConnection();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', UserRouter);
app.use('/api/v1/animal', AnimalRouter);
app.use('/api/v1/camera', CameraRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

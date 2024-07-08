import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { dbMongo } from './src/database/mongo/mongodb';
import { UserRouter } from './src/auth/infrasctucture/router/UserRoutes';
import { AnimalRouter } from './src/animal/infrasctucture/routes/AnimalRoutes';


dotenv.config();
dbMongo.on("error", console.error.bind(console, "connection error:"));

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

//-------------------------------------------//

app.use('/api/v1/auth', UserRouter);
app.use('/api/v1/animal', AnimalRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
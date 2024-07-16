import { CameraRepository } from "../../../domain/CameraRepository";
import { dbMongo } from "../../../../database/mongo/mongodb";
import { ObjectId } from "mongodb";

export class MongoDBCameraRepository implements CameraRepository {
    private isCameraOn: boolean = false;

    async on(): Promise<void> {
        this.isCameraOn = true;

        const cameraCollection = dbMongo.collection('cameras');
        await cameraCollection.updateOne(
            { _id: new ObjectId("your_camera_id") }, 
            { $set: { isCameraOn: this.isCameraOn } },
            { upsert: true } 
        );

        console.log('Camera is turned on.');
    }

    async off(): Promise<void> {
        this.isCameraOn = false;

        const cameraCollection = dbMongo.collection('cameras');
        await cameraCollection.updateOne(
            { _id: new ObjectId("your_camera_id") },
            { $set: { isCameraOn: this.isCameraOn } },
            { upsert: true } 
        );

        console.log('Camera is turned off.');
    }

    async getStatus(): Promise<boolean> {
        const cameraCollection = dbMongo.collection('cameras');
        const camera = await cameraCollection.findOne({ _id: new ObjectId("your_camera_id") });

        return camera ? camera.isCameraOn : false;
    }
}

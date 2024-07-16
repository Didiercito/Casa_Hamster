import { CameraRepository } from "../../../domain/CameraRepository";
import { testConnection } from "../../../../database/mysql/mysqldb";
import { Camera } from "../../../domain/Camera";

export class MysqlCameraRepository implements CameraRepository {
    async on(): Promise<void> {
        const connection = await testConnection();
        const sql = 'UPDATE cameras SET isCameraOn = ? WHERE id = ?';
        await connection.execute(sql, [true, "your_camera_id"]);
        console.log('Camera is turned on.');
    }

    async off(): Promise<void> {
        const connection = await testConnection();
        const sql = 'UPDATE cameras SET isCameraOn = ? WHERE id = ?';
        await connection.execute(sql, [false, "your_camera_id"]);
        console.log('Camera is turned off.');
    }

    async getStatus(): Promise<boolean> {
        const connection = await testConnection();
        const sql = 'SELECT isCameraOn FROM cameras WHERE id = ?';
        const [rows] = await connection.execute(sql, ["your_camera_id"]);
        const cameras = rows as any[];
        return cameras.length > 0 ? cameras[0].isCameraOn : false;
    }

    async save(camera: Camera): Promise<void> {
        const connection = await testConnection();
        const sql = 'INSERT INTO cameras (id, name, isCameraOn, resolution, device, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await connection.execute(sql, [
            camera.id,
            camera.name,
            camera.isCameraOn,
            camera.resolution,
            camera.device,
            camera.createdAt,
            camera.updatedAt
        ]);
    }

    async update(camera: Camera): Promise<void> {
        const connection = await testConnection();
        const sql = 'UPDATE cameras SET name = ?, isCameraOn = ?, resolution = ?, device = ?, updatedAt = ? WHERE id = ?';
        await connection.execute(sql, [
            camera.name,
            camera.isCameraOn,
            camera.resolution,
            camera.device,
            camera.updatedAt,
            camera.id
        ]);
    }

    async findById(id: string): Promise<Camera | null> {
        const connection = await testConnection();
        const sql = 'SELECT * FROM cameras WHERE id = ?';
        const [rows] = await connection.execute(sql, [id]);
        const cameras = rows as any[];
        if (cameras.length > 0) {
            const cameraData = cameras[0];
            return new Camera(
                cameraData.id,
                cameraData.name,
                cameraData.isCameraOn,
                cameraData.resolution,
                cameraData.device,
                new Date(cameraData.createdAt),
                new Date(cameraData.updatedAt)
            );
        }
        return null;
    }
}

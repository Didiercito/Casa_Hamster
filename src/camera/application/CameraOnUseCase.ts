import { CameraRepository } from "../domain/CameraRepository";

export class CameraOnUseCase {
    constructor(private cameraRepository: CameraRepository) {}

    async execute(id: string): Promise<void> {
        const camera = await this.cameraRepository.findById(id);
        if (camera) {
            camera.isCameraOn = true;
            camera.updatedAt = new Date();
            await this.cameraRepository.update(camera);
        } else {
            throw new Error("Camera not found");
        }
    }
}

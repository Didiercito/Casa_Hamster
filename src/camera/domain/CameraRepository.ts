
export interface CameraRepository {
    on(): Promise<void>;
    off(): Promise<void>;
    findById(id:string):Promise<void>

}

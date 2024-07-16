export class Camera {
    constructor(
        public id: string,
        public name: string,
        public isCameraOn: boolean,
        public resolution: string,
        public device: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}

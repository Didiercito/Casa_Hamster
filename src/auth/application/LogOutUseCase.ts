import { UserRepository } from "../domain/UserRepository";

export class LogOutUseCase {
    private userRepository: UserRepository; 

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository; 
    }

    async execute(id: string): Promise<void> {
        try {
            await this.userRepository.logout(id);
        } catch (error) {
            throw new Error(`Error en LogoutUseCase`);
        }
    }
}

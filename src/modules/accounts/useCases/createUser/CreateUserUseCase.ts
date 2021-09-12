import {inject, injectable} from 'tsyringe';
import {hashSync} from 'bcryptjs';
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO';
import {UserRepository} from '../../repostories/implementations/UsersRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UserRepository')
        private usersRepository: UserRepository 
    ){

    }

    async execute({name, email, driver_licence, password}: ICreateUserDTO): Promise<void>{
        const userAlreadExist = await this.usersRepository.findByEmail(email);
        if(userAlreadExist){
            throw new AppError("User already exists");
        }
        const passwordHash = hashSync(password, 8);
        await this.usersRepository.create({name, email, driver_licence, password: passwordHash});
    }
}


export {CreateUserUseCase}
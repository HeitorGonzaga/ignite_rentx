import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import {inject, injectable} from 'tsyringe';

interface IRequestDTO{
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase{

    constructor(
        @inject('SpecificationsRepository')
        private specificationRepository: ISpecificationsRepository){}
    async execute({name, description}: IRequestDTO): Promise<void>{
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);
        if(specificationAlreadyExists){
            throw new Error('Specification already exists!');
        } 
        await this.specificationRepository.create({name, description});
    }

}

export {CreateSpecificationUseCase}
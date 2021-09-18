import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";




class SpecificationsRepository implements ISpecificationsRepository{
    private repository : Repository<Specification>;

    constructor(){
        this.repository = getRepository(Specification); 
    }
    
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const especification = this.repository.create({
            name,
            description
        });
        await this.repository.save(especification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            where: {
                name
            }
        })
        return specification;
     }
}

export {SpecificationsRepository};
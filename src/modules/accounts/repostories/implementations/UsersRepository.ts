import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO';
import { Repository, getRepository } from 'typeorm';
import { User } from '../../entities/User';

class UserRepository implements IUsersRepository {

    private repository: Repository<User>;


    constructor() {
        this.repository = getRepository(User);
    }

    async findById(user_id: string): Promise<User> {
        const user = await this.repository.findOne(user_id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                email
            }
        });
        return user;
    }

    async create({ name, email, password, driver_licence, id, avatar }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name, email, password, driver_licence, avatar, id
        });
        await this.repository.save(user);
    }

}

export { UserRepository };
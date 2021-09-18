import { ICreateUserDTO } from "@modules/accounts/DTO/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UserRepositoryInMemory implements IUsersRepository{

    users: User[] = [];

    async findById(user_id: string): Promise<User> {
        const user = this.users.find((user)=> user.id === user_id);
        return user;
    }
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user)=> user.email === email);
        return user;
    }
    async create({ name, email, password, driver_licence, id, avatar }: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {name, email, password, driver_licence});
        this.users.push(user);
    }

}

export { UserRepositoryInMemory };
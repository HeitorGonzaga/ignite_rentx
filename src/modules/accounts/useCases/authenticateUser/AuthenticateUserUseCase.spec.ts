

import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/DTO/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repostories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepository: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", ()=>{
    beforeEach(()=>{
        userRepository = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
        createUserUseCase = new CreateUserUseCase(userRepository);
    })

    it("should be able to authenticate an user", async()=>{
        const user : ICreateUserDTO = {
            driver_licence: "000123",
            email: "user@teste.com",
            password: "1234",
            name: "User Teste"
        }
        
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({email: user.email, password: user.password});

        expect(result).toHaveProperty('token');
    })

    it("should not be able authenticate an nonexistent user", ()=>{
        expect(async()=>{
            await authenticateUserUseCase.execute({email: "false@test.com", password: "false"});

        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able authenticate with incorrect password", ()=>{
        expect(async()=>{
            const result = await authenticateUserUseCase.execute({email: "user@teste.com", password: "xxxddd"});
        }).rejects.toBeInstanceOf(AppError);
    });
});
import { response, Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post('/', createSpecificationController.handle);

export {specificationsRoutes};
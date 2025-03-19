import { Router } from 'express';
import{ CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import{ DetailUserController } from './controllers/user/DetailUserController'

import { isAuthenticated } from './middleware/isAuthenticated';

const router = Router();

// Rotas user
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me',isAuthenticated, new DetailUserController().handle)

export { router }; // Certifique-se de exportar o router corretamente

import { Router } from 'express';
import multer from "multer";

import{ CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import{ DetailUserController } from './controllers/user/DetailUserController'

import{ CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { isAuthenticated } from './middleware/isAuthenticated';


import { CreateOrderController } from './controllers/orders/CreateOrderController';
import { RemoveOrderController } from './controllers/orders/RemoveOrderController';

import uploadConfig from './config/multer'

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

// Rotas user
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me',isAuthenticated, new DetailUserController().handle)

//-- Rotas de categoria

router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new  ListCategoryController().handle)


//-- Rotas de produtos
router.post('/product',isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)


// -- Rotas de ordem

router.post('/order', isAuthenticated, new CreateOrderController().handle )
router.delete('/order', isAuthenticated, new RemoveOrderController().handle )

export { router };
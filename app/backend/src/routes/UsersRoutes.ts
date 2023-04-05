import { Router } from 'express';
import ValidateLogin from '../middleware/validateLogin';
import UsersController from '../controllers/UsersController';
import ValidateToken from '../middleware/validateToken';

const router = Router();

const usersController = new UsersController();
const validateLogin = new ValidateLogin();
const validateToken = new ValidateToken();

router.post('/', validateLogin.checkLogin, usersController.makeLogin);
router.get('/role', validateToken.checkToken, usersController.loginRole);

export default router;

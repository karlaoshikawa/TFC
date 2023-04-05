import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import ValidateToken from '../middleware/validateToken';

const router = Router();

const matchesController = new MatchesController();
const validateToken = new ValidateToken();

router.post('/', validateToken.checkToken, matchesController.createMatches);
router.get('/', matchesController.findAllMaches);
router.patch('/:id', validateToken.checkToken, matchesController.updateMatches);
router.patch('/:id/finish', validateToken.checkToken, matchesController.finishMatches);

export default router;

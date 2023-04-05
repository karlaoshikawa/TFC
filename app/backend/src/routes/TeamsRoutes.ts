import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.findTeamById);

export default router;

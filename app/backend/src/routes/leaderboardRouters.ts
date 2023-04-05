import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

// import ValidateToken from '../middleware/validateToken';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get('/', leaderBoardController.totalLeardeboard);
router.get('/home', leaderBoardController.teamsPerformaceHome);
router.get('/away', leaderBoardController.teamsPerformaceAway);

export default router;

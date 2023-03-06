import { Router } from "express";
import ScheduleController from "../../controllers/Schedule";
import { authentication } from "../../middleware/authentication";

const router = Router();

router
    .get('/', authentication, ScheduleController.read)
    .post('/create', authentication, ScheduleController.create)
    .put('/update', authentication, ScheduleController.update)
    .put('/delete/:uuid', authentication, ScheduleController.del);

export default router;
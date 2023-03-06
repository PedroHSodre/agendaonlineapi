import { Router } from "express";
import UserController from "../../controllers/User";
import { authentication } from "../../middleware/authentication";

const router = Router();

router
    .post('/create', UserController.create)
    .put('/update', authentication, UserController.update)
    .delete('/delete', authentication, UserController.del);

export default router;
import { Router } from "express";
import UserController from "../../controllers/User";
import { authentication } from "../../middleware/authentication";
import UserClientsController from "../../controllers/UserClients";

const router = Router();

router
    .post('/create', UserController.create)
    .put('/update', authentication, UserController.update)
    .delete('/delete/:uuid', authentication, UserController.del)
    .get('/clients', authentication, UserClientsController.index)

export default router;
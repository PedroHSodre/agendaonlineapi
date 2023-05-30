import { Router } from "express";
import ClientController from "../../controllers/Client";
import { authentication } from "../../middleware/authentication";

const router = Router();

router
    .get('/', authentication, ClientController.read)
    .post('/create', authentication, ClientController.create)
    .put('/update', authentication, ClientController.update)
    .delete('/delete/:uuid', authentication, ClientController.del);

export default router;
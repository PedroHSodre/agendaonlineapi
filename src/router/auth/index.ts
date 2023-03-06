import { Router } from "express";

import { auth } from "../../controllers/Auth";

const router = Router();

router
    .post('/', auth);

export default router;
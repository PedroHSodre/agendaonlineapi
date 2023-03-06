import { NextFunction, Request, RequestHandler, Response } from "express";
import { ICreateUserData, IUserData } from "../../types/User";
import { createUser, delUser, updateUser } from "../../services/User";
import { validateCreateUserBody } from "../../utils/validateBodys";

export default {
    create: async (req: Request, res: Response, next: NextFunction) => {
        const user: ICreateUserData = req.body;
        
        const userBodyIsValid = validateCreateUserBody(user);
    
        if(userBodyIsValid.error) return res.send(400).json(userBodyIsValid);
    
        try {
            const response = await createUser(user);
    
            return res.status(200).json(response);
        } catch(err: any) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const user: IUserData = req.body;
    
        if(!user.uuid) 
            return res.send(400).json({ error: true, message: 'Não foi possível atualizar usuário!' });
    
        try {
            const response = await updateUser(user);
    
            return res.status(200).json(response);
        } catch(err: any) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }
    },
    del: async (req: Request, res: Response, next: NextFunction) => {
        const uuid: string = req.params.uuid;
    
        if(!uuid) 
            return res.send(400).json({ error: true, message: 'Não foi possível excluir sua conta!' });
    
        try {
            const response = await delUser(uuid);
    
            return res.status(200).json(response);
        } catch(err: any) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }
    }
}
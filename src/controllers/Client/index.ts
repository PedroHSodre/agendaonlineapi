import { NextFunction, Request, RequestHandler, Response } from "express";
import { ICreateClientData, IClientData } from "../../types/Client";
import { clientExists, createClient, delClient, updateClient } from "../../services/Client";
import { validateCreateClientBody } from "../../utils/validateBodys";
import { getUserTokenDecoded } from "../../utils/userToken";

export default {
    create: async (req: Request, res: Response) => {
        const client: ICreateClientData = req.body;

        const token = getUserTokenDecoded(req);
        client.userId = token.id;

        const clientBodyIsValid = await validateCreateClientBody(client);
    
        if(clientBodyIsValid.error) return res.status(400).json(clientBodyIsValid);
    
        try {
            const response = await createClient(client);
    
            return res.status(200).json(response);
        } catch(err: any) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }
    },
    update: async (req: Request, res: Response) => {
        const client: IClientData = req.body;
    
        if(!client.uuid) 
            return res.status(400).json({ error: true, message: 'Não foi possível atualizar o cliente!' });
    
        try {
            const response = await updateClient(client);
    
            return res.status(200).json(response);
        } catch(err: any) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }
    },
    del: async (req: Request, res: Response) => {
        const uuid: string = req.params.uuid;
    
        const client = await clientExists('', '', uuid);
        if(!uuid || !client) 
            return res
                    .status(400)
                    .json(
                            { 
                                error: true, 
                                message: 'Não foi possível excluir esse cliente!'
                            }
                        );
    
        try {
            const response = await delClient(uuid);
    
            return res.status(200).json(response);
        } catch(err: any) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }
    }
}
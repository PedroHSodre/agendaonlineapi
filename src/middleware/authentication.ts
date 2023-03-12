import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import { getUserToken } from "../utils/userToken";

export const authentication: RequestHandler = async (req, res, next) => {
    const token = getUserToken(req);
    
    if (!token)
        return res
                .status(401)
                .send(
                        { 
                            error: true, 
                            message: 'Token não fornecido.' 
                        }
                );

    jwt.verify
        (
            token, 
            'ProtectToken', 
            (err, decoded) => {
                if (err) {
                    console.log('err', err);
                    
                    return res.status(500).send({
                        auth: false,
                        message: 'Falha ao autenticar token.',
                    });
                }
            }
        );

    next();
}
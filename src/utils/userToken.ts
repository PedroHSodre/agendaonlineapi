import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function getUserToken(req: Request) {
    const token = req?.headers?.authorization?.replace('Bearer ', '');
    
    return token;
}

export function getUserTokenDecoded(req: Request) {
    const token = getUserToken(req);

    if(token) {
        const { dataValues } = jwt.decode(token) as JwtPayload;

        return dataValues;
    } else {
        throw new Error('Token invalido!')
    }
}

import { NextFunction, Request, Response } from "express";
import { userClients } from "../../services/User";
import { getUserTokenDecoded } from "../../utils/userToken";

export default {
    index: async (req: Request, res: Response, next: NextFunction) => {
        const {limit, offset} = req.params;

        const user = getUserTokenDecoded(req);

        
        try {
            const response = await userClients(user.id, Number(offset), Number(limit));

            return res
                .status(200)
                .json(
                    { error: false, message: "Sucesso!", data: response}
                );
        } catch(err) {
            console.log(err);

            return res
                .status(200)
                .json(
                    { error: false, message: "Erro ao buscar!"}
                );
        }
    }
}
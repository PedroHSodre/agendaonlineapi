import jwt from "jsonwebtoken";
import comparePasswordEncrypted from "../../utils/comparePasswordEncrypted";
import { getUserByEmail } from "../User";

export const authenticate = async (email: string, password: string) => {
    const userExists = await getUserByEmail(email);

    if(!userExists) 
        throw new Error('Não foi possível fazer login!');

    if(userExists) {
        const passwordIsEqual = await comparePasswordEncrypted(userExists.password, password);

        if(!passwordIsEqual)
            throw new Error('Não foi possivel fazer o login!');

        
            return { 
                message: "Usuario logado com sucesso!", 
                data: {
                    user: {
                        email: userExists.email,
                        id: userExists.id,
                        cellphone: userExists.cellphone,
                        name: userExists.name
                    },
                    token: jwt.sign(
                        {
                            ...userExists
                        }, 
                        'ProtectToken', 
                        { 
                            expiresIn: '24h' 
                        }
                    )
                }
        }
    }
}
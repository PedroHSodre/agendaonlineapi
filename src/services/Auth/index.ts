import jwt from "jsonwebtoken";
import comparePasswordEncrypted from "../../utils/comparePasswordEncrypted";
import { getUserByEmail } from "../User";

export const authenticate = async (email: string, password: string) => {
    const user = await getUserByEmail(email);

    if(!user) 
        throw new Error('Não foi possível fazer login!');

    if(user) {
        const passwordIsEqual = await comparePasswordEncrypted(user.password, password);

        if(!passwordIsEqual)
            throw new Error('Não foi possivel fazer o login!');

        
            return { 
                message: "Usuario logado com sucesso!", 
                data: {
                    user: {
                        email: user.email,
                        id: user.id,
                        cellphone: user.cellphone,
                        name: user.name
                    },
                    token: jwt.sign(
                        {
                            ...user
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
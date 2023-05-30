import { Op, Sequelize } from "sequelize";
import { User } from "../../models/User";
import { ICreateUserData, IUserData } from "../../types/User";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Client } from "../../models/Client";

export const createUser = async (user: ICreateUserData) => {

    const exists = await userExists(user.email, user.document);

    if(!exists) {
        const saltRounds = 10;
    
        const passwordEncrypted = bcrypt.hashSync(user.password, saltRounds);
        
        const newUser = {
            ...user,
            uuid: uuidv4(),
            password: passwordEncrypted
        }
        
        const userCreated = await User.create(newUser);
    
        return userCreated;
    } else {
        throw new Error('Não foi possivel se registrar!');
    }
}

export const updateUser = async (user: IUserData) => {

    const saltRounds = 10;
    const passwordEncrypted = bcrypt.hashSync(user.password, saltRounds);

    try {
        const response = await User.update({...user, password: passwordEncrypted}, {
            where: {
                uuid: user.uuid
            }
        });

        return {
            ...response,
            error: false,
            message: "Usuário atualizado com sucesso!"
        }
    } catch(err) {
        throw new Error('Não foi possivel atualizar esse usuario!');
    }
}

export const delUser = async (uuid: string) => {

    try {
        await User.destroy({ where: { uuid } });

        return {
            error: false,
            message: "Usuário excluido com sucesso!"
        }
    } catch(err) {
        throw new Error('Não foi possivel atualizar esse usuario!');
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const userByEmail = await User.findOne({ where: { email } });
        
        return userByEmail;
    } catch(err) {
        throw new Error('Não foi possivel encontrar esse usuário!');
    }
}

export const userExists = async (email: string, document: string) => {
    try {
        const user = await User.findOne(
            { 
                where: {
                    [Op.or]: [
                        { email: email },
                        { document: document },
                    ] 
                }   
            }
        );
 
        return user;
    } catch(err) {
        console.log(err);
        return null;
    }
}

export const userClients = async (userId: string, page: number, limit: number) => {
    
    const offset = (page - 1) * limit;
    
    try {
        const clients = await Client.findAll({
            where: {
                userId
            },
            limit: limit ? limit : 15,
            offset: page ? offset : 1
        });

        return clients;
    } catch(err) {
        console.log(err);
        return null;
    }
}

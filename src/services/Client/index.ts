import { Op } from "sequelize";
import { Client } from "../../models/Client";
import { ICreateClientData, IClientData, IGetClientParams } from "../../types/Client";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const createClient = async (client: ICreateClientData) => {

    const exists = await getClient(
            {
                email: client.email, 
                document: client.document
            }
        );

    if(!exists) {
        const newClient = {
            ...client,
            document: client.document,
            uuid: uuidv4()
        }
        
        const response = await Client.create(newClient);
    
        return response;
    } else {
        throw new Error('Cliente já cadastrado!');
    }
}

export const updateClient = async (client: IClientData) => {

    try {
        const response = await Client.update({ ...client }, {
            where: {
                uuid: client.uuid
            }
        });

        return {
            ...response,
            error: false,
            message: "Cliente atualizado com sucesso!"
        }
    } catch(err: any) {
        console.log('Não foi possivel atualizar esse cliente!')
        console.log(err.response.message)
        throw new Error('Não foi possivel atualizar esse cliente!');
    }
}

export const delClient = async (uuid: string) => {

    try {
        await Client.destroy({ where: { uuid } });

        return {
            error: false,
            message: "Cliente excluido com sucesso!"
        }
    } catch(err) {
        throw new Error('Não foi possivel atualizar esse cliente!');
    }
}

export const getClientByEmail = async (email: string) => {
    try {
        const ClientByEmail = await Client.findOne({ where: { email } });
        
        return ClientByEmail;
    } catch(err) {
        throw new Error('Não foi possivel encontrar esse cliente!');
    }
}

export const getClient = async (data: IGetClientParams) => {
    console.log(data)
    try {
        const client = await Client.findOne(
            { 
                where: {
                    [Op.or]: [
                        { email: data.email ? data.email : ''},
                        { document: data.document ? data.document : ''},
                        { uuid: data.uuid ? data.uuid : ''}
                    ] 
                }   
            }
        );
 
        return client;
    } catch(err) {
        return null
    }
}
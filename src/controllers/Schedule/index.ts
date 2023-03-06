import { Request, RequestHandler, Response } from "express";
import { ICreateScheduleBody, IScheduleData } from "../../types/Schedule";
import { validateCreateScheduleBody } from "../../utils/validateBodys";
import { createSchedule, delSchedule, getUserSchedules, updateSchedule } from "../../services/Schedule";
import { getUserTokenDecoded } from "../../utils/userToken";

export default {
    create: async (req: Request, res: Response) => {
        const scheduleData: ICreateScheduleBody = req.body;
    
        const scheduleBodyIsValid = validateCreateScheduleBody(scheduleData);
    
        if(scheduleBodyIsValid.error) 
            return res
                    .status(400)
                    .json({ error: true, message: scheduleBodyIsValid.message });
    
        try{
            const tokenDecoded = getUserTokenDecoded(req);
    
            const schedule = {
                ...scheduleData,
                userUuid: tokenDecoded.uuid
            }
            
            const response = await createSchedule(schedule);
    
            return res
                    .status(200)
                    .json(response);
        } catch(err) {
            return res
                    .status(500)
                    .json({
                        error: true,
                        message: 'Não foi possivel cadastrar!'
                    });
        }
    },
    read: async (req: Request, res: Response) => {
        try {
            const tokenDecoded = getUserTokenDecoded(req);
            
            const response = await getUserSchedules(tokenDecoded.uuid);
    
            return res
                    .status(200)
                    .json(response);
        } catch(err: any) {
            return res
                    .status(400)
                    .json(
                        {
                            error: true,
                            message: err.message || 'Não foi possivel encontrar os registros!'
                        }
                    )
        }
    },
    update: async (req: Request, res: Response) => {

        const scheduleData: IScheduleData = req.body;
    
        if(!scheduleData.uuid) 
            return res.send(400).json({ error: true, message: 'Não foi possível atualizar esse agendamento!' });
    
        try {
            const response = await updateSchedule(scheduleData);
    
            return res.status(200).json(response);
        } catch(err: any) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }
    },
    del: async (req: Request, res: Response) => {

        const scheduleUuid: string = req.params.uuid;
    
        if(!scheduleUuid) 
            return res.send(400).json({ error: true, message: 'Não foi possível excluir esse agendamento!' });
    
        try {
            const response = await delSchedule(scheduleUuid);
    
            return res.status(200).json(response);
        } catch(err: any) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }
    }
}
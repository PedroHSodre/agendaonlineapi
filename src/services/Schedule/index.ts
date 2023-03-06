import { Schedule } from "../../models/Schedule";
import { ICreateScheduleBody, IScheduleData } from "../../types/Schedule";
import { v4 as uuidv4 } from 'uuid';

export const createSchedule = async (schedule: ICreateScheduleBody) => {
    try {
        const scheduleUuid = uuidv4();
    
        const data = {
            ...schedule,
            uuid: scheduleUuid
        }
        const scheduleCreated = Schedule.create(data);
    
        return scheduleCreated;
    } catch(err: any) {
        throw new Error(err);
    }
}

export const updateSchedule = async (schedule: IScheduleData) => {
    try {
        const response = await Schedule.update(schedule, {
            where: {
                uuid: schedule.uuid
            }
        });

        return {
            ...response,
            error: false,
            message: "Agenda atualizada com sucesso!"
        }
    } catch(err) {
        throw new Error('Não foi possivel atualizar a agenda!');
    }
}

export const delSchedule = async (uuid: string) => {

    try {
        await Schedule.destroy({ where: { uuid } });

        return {
            error: false,
            message: "Agendamento excluido com sucesso!"
        }
    } catch(err) {
        throw new Error('Não foi possivel excluir esse agendamento!');
    }
}

export const getUserSchedules = async (userUuid: string) => {
    try {
        const schedules = await Schedule.findAll({
            where: {
                userUuid: userUuid
            }
        });
        
        return schedules;
    } catch(err: any) { 
        throw new Error("Agenda não encontrada")
    }
}
export type ICreateScheduleBody = {
    name: string
    cellphone?: string
    data: string
    userUuid?: string
}

export type IScheduleData = ICreateScheduleBody & {
    uuid: string
}
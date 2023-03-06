export type ICreateUserData = {
    name: string
    cellphone?: string
    email: string
    password: string
    document: string
}

export type IUserData = ICreateUserData & {
  uuid: string;
}
export type ICreateClientData = {
    name: string
    cellphone?: string
    email: string
    address: string
    document: string
    userId?: number
  }

export type IClientData = ICreateClientData & {
  uuid: string;
}

export type IGetClientParams = {
  email?: string, 
  document?: string, 
  uuid?: string
}

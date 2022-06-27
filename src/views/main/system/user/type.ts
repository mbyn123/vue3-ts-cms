export type userListItemType = {
  cellphone: string
  createAt: string
  departmentId: number
  enable: number
  id: number
  name: string
  realname: string
  roleId: number
  updateAt: string
  password: string
}

export type userParamsType = {
  name?: string
  id?: string
  realname?: string
  cellphone?: string
  enable?: string
  updateAt?: []
}

export type submitFormType = {
  id?: number
  name: string
  realname: string
  password: string
  cellphone: string
  roleId: number
  departmentId: number
}

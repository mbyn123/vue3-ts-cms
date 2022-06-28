export type userListItemType = {
  cellphone: string
  createAt: string
  departmentId: string
  enable: number
  id: number
  name: string
  realname: string
  roleId: string
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
  newpassword?: string
  cellphone: string
  roleId: string
  departmentId: string
}

export type resultType = {
  data: string
}

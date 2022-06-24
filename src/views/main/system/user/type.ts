export type userListItemType = {
  cellphone: number
  createAt: string
  departmentId: number
  enable: number
  id: number
  name: string
  realname: string
  roleId: number
  updateAt: string
}

export type userParamsType = {
  name?: string
  id?: string
  realname?: string
  cellphone?: string
  enable?: string
  updateAt?: []
}

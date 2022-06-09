export type MenuDataItemType = {
  children: MenuDataItemType[]
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
}

export type MenuDataType = MenuDataItemType[]

type RoleType = {
  createAt: string
  id: number
  intro: string
  name: string
  updateAt: string
}

type DepartmentType = {
  createAt: string
  id: number
  leader: string
  name: string
  parentId: null
  updateAt: string
}

export type AdminUserType = {
  enable: number
  id: number
  name: string
  realname: string
  cellphone: number
  createAt: string
  updateAt: string
  role: RoleType
  department: DepartmentType
}

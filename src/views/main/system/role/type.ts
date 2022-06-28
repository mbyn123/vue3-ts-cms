import { MenuDataItemType } from '@/views/home/type'

export type roleListType = {
  createAt: string
  id: number
  intro: string
  name: string
  updateAt: string
  menuList: MenuDataItemType[]
}

export type roleSearchParamType = {
  name: string
  intro: string
  createAt: string
}

export type departmentListType = {
  createAt: string
  id: number
  leader: string
  name: string
  parentId: number
  updateAt: string
}

export type departmentSubmitType = {
  name: string
  parentId: number
  leader: string
  id?: number
}

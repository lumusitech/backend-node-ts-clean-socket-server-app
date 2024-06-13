export interface Ticket {
  id: string
  number: number
  createdAt: Date
  handleAtDesk?: string // desktop1, desktop2, desktop3
  handleAt?: Date
  done: boolean
}
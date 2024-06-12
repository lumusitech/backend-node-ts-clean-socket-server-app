import type { Request, Response } from "express";

export class TicketController {
  // DI - WssService
  constructor() { }

  public getTickets = (req: Request, res: Response) => {
    res.json('getTickets')
  }

  public getLastTicketNumber = (req: Request, res: Response) => {
    res.json('getLastTicketNumber')
  }

  public getPendingTickets = (req: Request, res: Response) => {
    res.json('getPendingTickets')
  }

  public createTicket = (req: Request, res: Response) => {
    res.json('createTicket')
  }

  public drawTicket = (req: Request, res: Response) => {
    res.json('drawTicket')
  }

  public TicketFinished = (req: Request, res: Response) => {
    res.json('TicketFinished')
  }

  public workingOn = (req: Request, res: Response) => {
    res.json('workingOn')
  }
}
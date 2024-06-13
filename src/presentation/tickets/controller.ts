import type { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController {
  // DI - WssService
  constructor(
    private readonly ticketService = new TicketService()
  ) { }

  public getTickets = (req: Request, res: Response) => {
    res.json(this.ticketService.tickets);
  }

  public getLastTicketNumber = (req: Request, res: Response) => {
    res.json(this.ticketService.lastTicketNumber);
  }

  public getPendingTickets = (req: Request, res: Response) => {
    res.json(this.ticketService.pendingTickets)
  }

  public createTicket = (req: Request, res: Response) => {
    res.status(201).json(this.ticketService.createTicket());
  }

  public drawTicket = (req: Request, res: Response) => {
    const { desk } = req.params
    res.json(this.ticketService.drawDesk(desk))
  }

  public TicketFinished = (req: Request, res: Response) => {
    const { ticketId } = req.params
    res.json(this.ticketService.onFinishedTicket(ticketId))
  }

  public workingOn = (req: Request, res: Response) => {
    console.log(this.ticketService.lastWorkingOnTickets);
    res.json(this.ticketService.lastWorkingOnTickets)

  }
}
const currentTicketLbl = document.querySelector('#lbl-new-ticket')
const createTicketBtn = document.querySelector('button')

const getLastTicket = async () => {
  const lastTicket = await fetch('/api/ticket/last').then(resp => resp.json())
  currentTicketLbl.innerText = lastTicket
}

const createTicket = async () => {
  const ticket = await fetch('/api/ticket', { method: 'POST' }).then(resp => resp.json())
  currentTicketLbl.innerText = ticket.number
}

createTicketBtn.addEventListener('click', createTicket)
getLastTicket()

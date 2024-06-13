// Html references
const lblPending = document.querySelector('#lbl-pending')
const deskHeader = document.querySelector('h1')
const noMoreAlert = document.querySelector('.alert')
const btnDraw = document.querySelector('#btn-draw')
const btnDone = document.querySelector('#btn-done')
const currentTicketLbl = document.querySelector('small')

const searchParams = new URLSearchParams(window.location.search)
if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('El escritorio es requerido')
}
const deskNumber = searchParams.get('escritorio')
let workingTicket = null
deskHeader.innerHTML = deskNumber

const checkTicketCount = (currentCount = 0) => {
  if (currentCount === 0) {
    noMoreAlert.classList.remove('d-none')
    lblPending.classList.add('d-none')
  } else {
    noMoreAlert.classList.add('d-none')
    lblPending.classList.remove('d-none')
    lblPending.innerHTML = currentCount
  }
}

const loadInitialCount = async () => {
  const pendingTickets = await fetch('/api/ticket/pending').then(resp => resp.json())

  checkTicketCount(pendingTickets.length)
}

const getTicket = async () => {
  await finishTicket()

  const { status, ticket, message } = await fetch(`/api/ticket/draw/${deskNumber}`).then(resp =>
    resp.json(),
  )

  if (status === 'error') {
    currentTicketLbl.innerText = message
    return
  }

  workingTicket = ticket
  currentTicketLbl.innerText = ticket.number
}

const finishTicket = async () => {
  if (!workingTicket) return

  const { status, message } = await fetch(`/api/ticket/done/${workingTicket.id}`, {
    method: 'PUT',
  }).then(resp => resp.json())

  console.log({ status, message })

  if (status === 'success') {
    workingTicket = null
    currentTicketLbl.innerText = 'Nadie'
  }
}

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws')

  socket.onmessage = event => {
    const { type, payload } = JSON.parse(event.data)
    if (type !== 'on-ticket-count-changed') return
    checkTicketCount(payload)
  }

  socket.onclose = event => {
    console.log('Connection closed')
    setTimeout(() => {
      console.log('retrying to connect')
      connectToWebSockets()
    }, 1500)
  }

  socket.onopen = event => {
    console.log('Connected')
  }
}

btnDraw.addEventListener('click', getTicket)
btnDone.addEventListener('click', finishTicket)

loadInitialCount()
connectToWebSockets()

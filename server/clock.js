console.clear()

//
// JS.
// -------------------------

function clock () {
  const formatter = Intl.DateTimeFormat
  const clockElement = document.querySelector('.clock')
  const dateElement = clockElement.querySelector('[data-clock="date"]')
  const timeElement = clockElement.querySelector('[data-clock="time"]')
  const date = new formatter(undefined, {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format
  const time = new formatter(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  })

  const span = ({ value }) => {
    const attr = value === ':' ? '' : ` class="number" data-value="${value}"`
    return `<span${attr}>${value}</span>`
  }

  const updateDate = _ => (dateElement.innerHTML = date(new Date()))

  const updateTime = _ => (timeElement.innerHTML = time.formatToParts(new Date()).map(span).join(''))

  clockElement.dateTime = new Date().toISOString()

  updateDate()

  setInterval(updateDate, 1000 * 60 * 15)

  updateTime()

  setInterval(updateTime, 1000)
}

clock()

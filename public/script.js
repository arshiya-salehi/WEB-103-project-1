async function load() {
  const res = await fetch("/api/events")
  const data = await res.json()
  const list = document.getElementById("list")
  list.innerHTML = ""
  for (const item of data) {
    const card = document.createElement("article")
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:100%;height:auto;">
      <h3>${item.name}</h3>
      <p>${new Date(item.datetime).toLocaleString()}</p>
      <p>${item.venue} • ${item.genre}</p>
      <p>${item.ticketPrice === 0 ? "Free" : "$" + item.ticketPrice}</p>
      <footer>
        <a href="/events/${item.slug}" role="button">View details</a>
      </footer>
    `
    list.appendChild(card)
  }
}
load()

import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { events } from "./data/events.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "public")))

app.get("/api/events", (req, res) => {
  res.json(events)
})

app.get("/events/:slug", (req, res) => {
  const item = events.find(e => e.slug === req.params.slug)
  if (!item) {
    res.status(404)
    res.sendFile(path.join(__dirname, "public", "404.html"))
    return
  }
  const price = item.ticketPrice === 0 ? "Free" : `$${item.ticketPrice}`
  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${item.name}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@latest/css/pico.min.css">
      </head>
      <body>
        <main class="container">
          <nav>
            <ul>
              <li><strong>Discover Local Music</strong></li>
            </ul>
            <ul>
              <li><a href="/">Home</a></li>
            </ul>
          </nav>
          <article>
            <header>
              <h1>${item.name}</h1>
              <p>${new Date(item.datetime).toLocaleString()}</p>
            </header>
            <img src="${item.image}" alt="${item.name}" style="max-width:100%;height:auto;">
            <p><strong>Artists:</strong> ${item.artists.join(", ")}</p>
            <p><strong>Venue:</strong> ${item.venue}</p>
            <p><strong>Genre:</strong> ${item.genre}</p>
            <p><strong>Ticket Price:</strong> ${price}</p>
            <p>${item.description}</p>
          </article>
        </main>
      </body>
    </html>
  `
  res.send(html)
})

app.use((req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, "public", "404.html"))
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})

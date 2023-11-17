import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Intro')
}),

app.get('/dashboard', (req, res) => {
    res.send('dashboard')
}),

app.get('/dashboard/task', (req, res) => {
    res.send('tasks')
}),

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
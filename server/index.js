require('dotenv') = config()
const express = require('express')
const { json } = require('bodyparser')

const {SERVER_PORT} = process.env

const app = express()

app.use(json())
//add endpoint below

app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`)
})

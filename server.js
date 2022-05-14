const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const winston = require('winston');
const morgan = require('morgan')

// const bodyParser = require('body-parser'); you no longer need body-parser package...it comes built into expressJS now

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json()) //you no longer need body-parser package...it comes built into expressJS now
// app.use(morgan('tiny'))
// app.use(morgan('combined'))


app.get('/', (req, res) => {
  res.cookie('session', '1', { httpOnly: true })
  res.cookie('session', '1', { secure: true })
res.set({
  'Content-Security-Policy': "script-src 'self' 'https://apis.google.com'"
})
res.send('Hello World!')
});

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  if (userInput) {
    winston.log('info', 'user input: ' + userInput);
    res.status(200).json('success');
  } else {
    winston.error('This guy is messing with us:' + userInput);
    res.status(400).json('incorrect submission')
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

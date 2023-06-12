const express = require('express');
const app = express();
//Socket.io has to use the http server
const server = require('http').Server(app);

//Express View Engine for Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})
const express = require('express');
const path = require('path')

const app = express();
const server = require('http').Server(app);
const mongoose = require('mongoose');

mongoose.promise = global.promise;

const bodyParser = require('body-parser');
const chatServer = require('./src/lib/chatServer');
// ==== test server ke react ====
const chatServer2 = require('./chatServer2')

const jsonParser = bodyParser.json();

const hostname = '127.0.0.1';
const port = server.listen(process.env.PORT || 3000);

const localMongoDB = 'mongodb://localhost:27017/ladangCurhat';
const mlab = 'mongodb://admin:admin@ds227740.mlab.com:27740/ladang-curhat';
const db = mongoose.connection;
mongoose.connect(process.env.DB_CONNECTION_STRING || mlab);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db');
});

// ===========  Includes  =================
app.use('/', express.static(__dirname));
app.use('/stylesheet', express.static(`${__dirname}/public/stylesheet/`))
app.use('/script', express.static(`${__dirname}/public/script/`));
app.use('/images', express.static(`${__dirname}/public/img/`));
app.use('/bootstrap', express.static(`${__dirname}/node_modules/bootstrap/dist/css/`));
app.use('/datatables', express.static(`${__dirname}/node_modules/datatables.net/js/`));
app.use('/datatables_css', express.static(`${__dirname}/node_modules/datatables.net-dt/`));
app.use('/jquery', express.static(`${__dirname}/node_modules/jquery/`));
app.use('/workbox', express.static(`${__dirname}/node_modules/workbox-sw/build/workbox-sw.js`));
app.use('/main.js', express.static(path.join(__dirname, '/dist/main.js'))) // webpack bundle
// =========== Route Handlers =============
const handleSignUp = require('./src/auth/handleSignUp');
const handleSignIn = require('./src/auth/handleSignIn');

// ============  Routes  ==================
app.get('/react', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
app.get('/signup', (req, res) => {
  res.sendFile(`${__dirname}/public/signup.html`);
});
app.post('/signup', jsonParser, handleSignUp);
app.post('/signin', jsonParser, handleSignIn);

server.listen(port, () => {
  console.log('Server on port 3000');
});

chatServer.listen(server);

const bodyParser = require('body-parser');
const cluster = require('cluster');
const dotenv = require('dotenv');
const express = require('express');
const favicon = require('serve-favicon');
const http = require('http');
const mongoose = require('mongoose');
const os = require('os');
const path = require('path');

const numCPUs = process.env.WEB_CONCURRENCY || os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++)
    cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = http.createServer(app);

  dotenv.config({ path: path.join(__dirname, '.env') });

  const PORT = process.env.PORT || 3000;
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/usersmagic';

  const agreementRouteController = require('./routes/agreementRoute');
  const indexRouteController = require('./routes/indexRoute');
  const trRouteController = require('./routes/trRoute');
  const waitlistRouteController = require('./routes/waitlistRoute');

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    req.query = (req.query && typeof req.query == 'object' ? req.query : {});
    next();
  });
  
  app.use('/', indexRouteController);
  app.use('/agreement', agreementRouteController);
  app.use('/tr', trRouteController);
  app.use('/waitlist', waitlistRouteController);
  
  server.listen(PORT, () => {    
    console.log(`Server is on port ${PORT} as Worker ${cluster.worker.id} running @ process ${cluster.worker.process.pid}`);
  });
}

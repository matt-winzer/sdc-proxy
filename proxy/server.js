const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const httpProxy = require('http-proxy');

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const proxy = httpProxy.createProxyServer({
  target: "http://ec2-18-191-178-115.us-east-2.compute.amazonaws.com/"
});

app.all("/data/toptracks", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-191-178-115.us-east-2.compute.amazonaws.com/"
  });
});

app.get('/data/albumswithartist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://ec2-13-58-138-231.us-east-2.compute.amazonaws.com/'
  });
});
app.get('/data/albumsbyartist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://ec2-13-58-138-231.us-east-2.compute.amazonaws.com/'
  });
});
app.get('/data/epswithartist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://ec2-13-58-138-231.us-east-2.compute.amazonaws.com/'
  });
});
app.get('/data/compilationswithartist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://ec2-13-58-138-231.us-east-2.compute.amazonaws.com/'
  });
});

app.all("/data/artist/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-52-91-196-238.compute-1.amazonaws.com/"
  });
});


http: app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

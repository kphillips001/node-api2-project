const express = require('express');
const router = express('../posts/router')
const server = express();

server.use(express.json());
server.use('api/posts', router);

module.exports = server;
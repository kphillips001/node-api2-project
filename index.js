const server = require('./api/server');

const port = 6000
server.listen(port, () => {
    console.log(`Server is running on port: 6000`)
})
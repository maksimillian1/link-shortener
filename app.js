const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');

const server = express();

server.use(express.json({ extended: true }));
server.use('/api/auth', require('./routes/auth.routes'));
server.use('/api/link', require('./routes/link.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        server.listen(PORT, () => { console.log(`Server started on port: ${PORT}`)} );

    }catch(e) {
        console.log(`Server error: ${e.message}`);
        process.exit(1);
    }
}

start();
const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware')

const nextI18next = require('./i18n')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

app.prepare()
    .then(() => {
        const server = express();

        server.use(nextI18NextMiddleware(nextI18next));

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(PORT, (err) => {
            if (err) throw err;
            console.log(`Ready on localhost:${PORT} `);
        });


    })
    .catch((ex) => {
        console.log(ex.stack);
        process.exit(1)
    })
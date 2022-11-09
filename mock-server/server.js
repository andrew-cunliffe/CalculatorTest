const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
    if (req.method !== 'POST') {
        return { error: 'POST requests only' };
    }

    let result = 0;

    switch (req.url) {
        case '/add':
            result = Number(req.body.valueA) + Number(req.body.valueB);
            break;
        case '/subtract':
            result = Number(req.body.valueA) - Number(req.body.valueB);
            break;
        case '/multiply':
            result = Number(req.body.valueA) * Number(req.body.valueB);
            break;
        case '/divide':
            if (Number(req.body.valueB) === 0) {
                result = 'Infinate';
            } else {
                result = Number(req.body.valueA) / Number(req.body.valueB);
            }
            break;
    }

    return res.json({ result });
});

server.listen(3000, () => {
    console.log('JSON Server is running');
});

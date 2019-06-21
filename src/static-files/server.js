'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const Inert = require('@hapi/inert');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        // routes: {
        //     files: {
        //         relativeTo: Path.join(__dirname, 'public')
        //     }
        // }
    });

    await server.register(Inert);


    server.route({
        method: 'GET',
        path: '/main.js',
        handler: (request, h) => {
            return h.file(Path.join(__dirname, 'public') + '/main.js');
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
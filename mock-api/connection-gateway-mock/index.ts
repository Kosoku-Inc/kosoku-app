import * as http from 'http';

import env from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';

env.config({ path: '../../.env' });

export enum WSMessageType {
    DriveRequest = 'DRIVE_REQUEST',
    LocationUpdate = 'LOCATION_UPDATE',
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.handshake.auth);
    socket.on(WSMessageType.LocationUpdate, (data) => {
        console.log('Location update', data);
    });
});

server.listen(4545, () => {
    console.log(`Node server listening on port ${4545}!`);
});

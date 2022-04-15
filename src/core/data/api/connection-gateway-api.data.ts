import { logger } from '../../utils/logger.utils';
import { environmentConfig } from '../../utils/third-party/environment-config.utils';

// eslint-disable-next-line
// @ts-ignore
navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
    return "react-native";
});

// eslint-disable-next-line
import { io, Socket } from 'socket.io-client';

export enum WSMessageType {
    DriveRequest = 'DRIVE_REQUEST',
    LocationUpdate = 'LOCATION_UPDATE',
}

export type WSMessage = {
    type: WSMessageType;
};

export type Listener = (data: WSMessage) => void;

export class ConnectionGatewayAPI {
    private authToken = '';
    private listeners: Array<Listener> = [];
    private socket: Socket | null = null;

    setAuthToken = (token: string) => (this.authToken = token);

    addEventListener = (callback: Listener): (() => void) => {
        this.listeners.push(callback);

        return () => this.listeners.splice(this.listeners.indexOf(callback), 0);
    };

    connect = async () => {
        try {
            this.socket = io(environmentConfig.get('connectionGatewayAPI'), {
                transports: ['websocket'],
                auth: {
                    'Authorization': `Bearer ${this.authToken}`
                }
            });

            this.socket.on('message', (data) => {
                this.listeners.forEach((listener) => listener(data as WSMessage));
            });

            this.socket.on('connect_error', (error) => {
                logger.log(error);
                this.disconnect();
            });

            this.socket.on('connect', () => {
                logger.log('Socket opened');
            });
        } catch (e) {
            logger.log(e);
        }
    };

    send = async <T>(event: WSMessageType, data: T) => {
        this.socket?.emit(event, data);
    };

    disconnect = async () => {
        this.socket?.close();
    };
}

export const connectionGatewayAPI = new ConnectionGatewayAPI();

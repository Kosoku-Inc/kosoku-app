import { logger } from '../../utils/logger.utils';
import { environmentConfig } from '../../utils/third-party/environment-config.utils';

// eslint-disable-next-line
// @ts-ignore
navigator.__defineGetter__('userAgent', function () {
    // you have to import rect native first !!
    return 'react-native';
});

// eslint-disable-next-line
import { io, Socket } from 'socket.io-client';
// eslint-disable-next-line import/order
import { toastService } from '../../utils/services/toast-service.utils';
// eslint-disable-next-line import/order
import { RideStatus } from '../../model/ride.model';

export enum WSMessageType {
    RideRequest = 'RIDE_REQUEST',
    RideStatusChange = 'RIDE_STATUS_CHANGE',
    RideAccept = 'RIDE_ACCEPT',
    RideDecline = 'RIDE_DECLINE',
    RideStopSearch = 'RIDE_STOP_SEARCH',
    RideTimeout = 'RIDE_TIMEOUT',
    LocationUpdate = 'LOCATION_UPDATE',
    InternalReconnect = 'INTERNAL_RECONNECT',
}

export type WSMessage = {
    type: WSMessageType;
    payload?: RideStatus | unknown;
};

export type Listener = (data: WSMessage) => void;

export class ConnectionGatewayAPI {
    private authToken = '';
    private isClient = false;
    private listeners: Array<Listener> = [];
    private socket: Socket | null = null;

    setAuthToken = (token: string) => (this.authToken = token);
    setIsClient = (flag: boolean) => (this.isClient = flag);

    addEventListener = (callback: Listener): (() => void) => {
        this.listeners.push(callback);

        return () => this.listeners.splice(this.listeners.indexOf(callback), 0);
    };

    connect = async () => {
        try {
            this.socket = io(environmentConfig.get('connectionGatewayAPI'), {
                transports: ['websocket'],
                auth: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                reconnection: true,
            });

            Object.values(WSMessageType).forEach((event) => {
                this.socket?.on(event, (data) => {
                    this.listeners.forEach((listener) => listener({ type: event, payload: data }));
                });
            });

            this.socket
                .on('connect_error', (error) => {
                    logger.log(error);
                    toastService.showError(undefined, 'Соединение потеряно', 'Восстанавливаем...');
                    this.retryConnection();
                })
                .on('connect', () => {
                    toastService.showSuccess('Соединение установлено', 'Приятного пользования');
                    this.listeners.forEach((listener) => listener({ type: WSMessageType.InternalReconnect }));
                })
                .on('disconnect', () => {
                    toastService.showError(undefined, 'Соединение закрыто', 'Восстанавливаем...');
                });
        } catch (e) {
            logger.log(e);
        }
    };

    send = async <T>(event: WSMessageType, data: T) => {
        this.socket?.emit(event, {
            isClient: this.isClient,
            data,
        });
    };

    disconnect = async () => {
        this.socket?.close();

        Object.values(WSMessageType).forEach((event) => {
            this.socket?.removeAllListeners(event);
        });
    };

    private retryConnection = () => {
        this.socket?.connect();
    };
}

export const connectionGatewayAPI = new ConnectionGatewayAPI();

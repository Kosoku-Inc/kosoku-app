import {eventChannel, EventChannel, SagaIterator, Subscribe} from 'redux-saga';
import {call, select, takeLatest} from 'redux-saga/effects';

import {connectionGatewayAPI, WSMessage, WSMessageType} from '../../../core/data/api/connection-gateway-api.data';
import {getExistingUser} from '../../../core/data/store/user.selectors';
import {logger} from '../../../core/utils/logger.utils';
import {geolocationService} from '../utils/services/geolocation-service.utils';

import {receiveLocationUpdateSaga} from './receive-gps-position.saga';
import {toastService} from '../../../core/utils/services/toast-service.utils';
import {User} from '../../../core/model/user.model';

export const webSocketSubscribe: Subscribe<WSMessage> = (emitter) => connectionGatewayAPI.addEventListener(emitter);

export const webSocketMessagesReceiver = (): EventChannel<WSMessage> => eventChannel<WSMessage>(webSocketSubscribe);

export function* receiveWebSocketMessageSaga(message: WSMessage): SagaIterator {
    const user: User = yield select(getExistingUser);

    if (!user) return;

    yield call(logger.log, message);

    switch (message.type) {
        case WSMessageType.InternalReconnect: {
            const location = yield call(geolocationService.getLocation);
            yield call(receiveLocationUpdateSaga, location);
            break;
        }
        case WSMessageType.LocationUpdate: {
            break;
        }
        case WSMessageType.RideRequest: {
            if (!user.driver) {
                break;
            }

            break;
        }
        case WSMessageType.RideStatusChange: {
            break;
        }
        case WSMessageType.RideAccept: {
            break;
        }
        case WSMessageType.RideDecline: {
            break;
        }
        default: {
            yield call(toastService.showError, new Error('Неизвестная серверная команда'));
        }
    }
}

export function* bootstrapWebSocketSubscription(): SagaIterator {
    const webSocketEventChannel = yield call(webSocketMessagesReceiver);

    yield takeLatest(webSocketEventChannel, receiveWebSocketMessageSaga);
}

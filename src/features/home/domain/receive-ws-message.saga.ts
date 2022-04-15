import { eventChannel, EventChannel, SagaIterator, Subscribe } from 'redux-saga';
import { call, select, takeLatest } from 'redux-saga/effects';

import { connectionGatewayAPI, WSMessage } from '../../../core/data/api/connection-gateway-api.data';
import { getExistingUser } from '../../../core/data/store/user.selectors';
import { logger } from '../../../core/utils/logger.utils';

export const webSocketSubscribe: Subscribe<WSMessage> = (emitter) => connectionGatewayAPI.addEventListener(emitter);

export const webSocketMessagesReceiver = (): EventChannel<WSMessage> => eventChannel<WSMessage>(webSocketSubscribe);

export function* receiveWebSocketMessageSaga(message: WSMessage): SagaIterator {
    const user = yield select(getExistingUser);

    if (!user) return;

    yield call(logger.log, message);
}

export function* bootstrapWebSocketSubscription(): SagaIterator {
    const webSocketEventChannel = yield call(webSocketMessagesReceiver);

    yield takeLatest(webSocketEventChannel, receiveWebSocketMessageSaga);
}

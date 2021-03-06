import { eventChannel, EventChannel, SagaIterator, Subscribe } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { connectionGatewayAPI, WSMessage, WSMessageType } from '../../../core/data/api/connection-gateway-api.data';
import { getExistingUser } from '../../../core/data/store/user.selectors';
import { ExtendedDriverRideRequest, Ride, RideStatus } from '../../../core/model/ride.model';
import { User } from '../../../core/model/user.model';
import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { PAY } from '../../payments/data/store/payments.actions';
import {
    REQUEST_RIDE,
    RESET_HOME_STATE,
    RESTORE_DRIVE_STATE,
    RestoreDriveStatePayload,
    SET_DRIVER_LOCATION,
    SET_DRIVER_RIDE_REQUEST,
    SET_RIDE,
    SET_RIDE_STATUS,
} from '../data/store/home.actions';
import { getRide } from '../data/store/home.selectors';
import { Location } from '../model/location.model';
import { geolocationService } from '../utils/services/geolocation-service.utils';
import { mapService } from '../utils/services/map-service.utils';

import { receiveLocationUpdateSaga } from './receive-gps-position.saga';

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
            const data = message.payload as { location: Location };

            if (!user.driver) {
                yield put(SET_DRIVER_LOCATION(data.location));
            }

            break;
        }
        case WSMessageType.RideRequest: {
            const data = message.payload as { data: ExtendedDriverRideRequest };

            if (!user.driver) {
                break;
            }

            yield put(SET_DRIVER_RIDE_REQUEST({ data: data.data }));
            yield call(mapService.animateToRegion, data.data.to, data.data.from);

            break;
        }
        case WSMessageType.RideStatusChange: {
            const rideStatus = (message.payload as any).status as RideStatus;

            yield put(SET_RIDE_STATUS.COMPLETED(rideStatus));

            if (rideStatus === RideStatus.Completed) {
                const ride: Ride = yield select(getRide);
                yield put(RESET_HOME_STATE());
                yield put(PAY.TRIGGER({ amount: ride.cost, rideId: ride.id }));
            }

            break;
        }
        case WSMessageType.RideAccept: {
            const data = message.payload as { ride: Ride; driverLocation: Location };

            yield put(REQUEST_RIDE.COMPLETED(false));
            yield put(SET_RIDE_STATUS.COMPLETED(RideStatus.Starting));
            yield put(SET_RIDE(data));

            break;
        }
        case WSMessageType.RideDecline: {
            yield put(SET_RIDE_STATUS.COMPLETED(RideStatus.NoRide));

            if (!user.driver) {
                yield put(REQUEST_RIDE.COMPLETED(false));
                yield call(toastService.showError, undefined, '?????????????? ????????????????', '?????????????????? ?????????????? ??????????');
            } else {
                // TODO
            }

            break;
        }
        case WSMessageType.RestoreState: {
            const data = message.payload as RestoreDriveStatePayload;

            if (data.driverLocation) {
                yield call(mapService.animateCamera, data.driverLocation);
            }

            yield put(RESTORE_DRIVE_STATE(data));

            break;
        }
        case WSMessageType.RideTimeout: {
            yield put(SET_DRIVER_RIDE_REQUEST());

            if (geolocationService.latestLocation) {
                yield call(mapService.animateCamera, geolocationService.latestLocation, 15);
            }

            break;
        }
        default: {
            yield call(toastService.showError, new Error('?????????????????????? ?????????????????? ??????????????'));
        }
    }
}

export function* bootstrapWebSocketSubscription(): SagaIterator {
    const webSocketEventChannel = yield call(webSocketMessagesReceiver);

    yield takeLatest(webSocketEventChannel, receiveWebSocketMessageSaga);
}

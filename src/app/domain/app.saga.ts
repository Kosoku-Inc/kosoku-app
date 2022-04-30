import { SagaIterator } from 'redux-saga';
import { spawn } from 'redux-saga/effects';

import { listenForLogin } from '../../features/auth/domain/login.saga';
import { listenForLogout } from '../../features/auth/domain/logout.saga';
import { listenForRegister } from '../../features/auth/domain/register.saga';
import { listenForFetchHistory } from '../../features/history/domain/fetch-history.saga';
import { listenForChooseRoute } from '../../features/home/domain/choose-route.saga';
import { listenForDeclineRideRequest } from '../../features/home/domain/decline-ride.saga';
import { listenForFetchPlaces } from '../../features/home/domain/fetch-places.saga';
import { listenForInitializeMap } from '../../features/home/domain/initialize-map.saga';
import { listenForPrepareRide } from '../../features/home/domain/prepare-ride-data.saga';
import { listenForAnswerToRideRequest, listenForRequestRideSaga } from '../../features/home/domain/request-ride.saga';
import { listenForSetChosenLocation } from '../../features/home/domain/set-chosen-location.saga';
import {listenForSetRideStatus} from '../../features/home/domain/set-ride-status.saga';
import { listenForSetRouteLocation } from '../../features/home/domain/set-route-location.saga';
import { listenForAddCard } from '../../features/payments/domain/add-card.saga';
import { listenForGetPaymentMethods } from '../../features/payments/domain/get-payment-methods.saga';
import { listenForPay } from '../../features/payments/domain/pay.saga';
import { listenForRemovePaymentMethod } from '../../features/payments/domain/remove-payment-method.saga';
import { listenForSetAsDefaultPaymentMethod } from '../../features/payments/domain/set-as-default.saga';
import { listenForGetUser } from '../../features/profile/domain/get-user.saga';

import { listenForInitialization } from './initialization.saga';

export function* appSaga(): SagaIterator {
    yield spawn(listenForInitialization);
    yield spawn(listenForLogin);
    yield spawn(listenForRegister);
    yield spawn(listenForLogout);
    yield spawn(listenForFetchHistory);
    yield spawn(listenForGetUser);
    yield spawn(listenForGetPaymentMethods);
    yield spawn(listenForRemovePaymentMethod);
    yield spawn(listenForSetAsDefaultPaymentMethod);
    yield spawn(listenForAddCard);
    yield spawn(listenForPay);
    yield spawn(listenForInitializeMap);
    yield spawn(listenForSetChosenLocation);
    yield spawn(listenForRequestRideSaga);
    yield spawn(listenForAnswerToRideRequest);
    yield spawn(listenForSetRouteLocation);
    yield spawn(listenForFetchPlaces);
    yield spawn(listenForPrepareRide);
    yield spawn(listenForChooseRoute);
    yield spawn(listenForDeclineRideRequest);
    yield spawn(listenForSetRideStatus);
}

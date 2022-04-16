import { initStripe } from '@stripe/stripe-react-native';
import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, spawn } from 'redux-saga/effects';

import { connectionGatewayAPI } from '../../core/data/api/connection-gateway-api.data';
import { Tokens } from '../../core/model/tokens.model';
import { toastService } from '../../core/utils/services/toast-service.utils';
import { tokenService } from '../../core/utils/services/token-service.utils';
import { environmentConfig } from '../../core/utils/third-party/environment-config.utils';
import { splashScreen } from '../../core/utils/third-party/splash-screen.utils';
import { authAPI } from '../../features/auth/data/api/auth-api.data';
import { LOGIN } from '../../features/auth/data/store/auth.actions';
import { AuthResponse } from '../../features/auth/model/auth-response.model';
import { fetchHistorySaga } from '../../features/history/domain/fetch-history.saga';
import { bootstrapWebSocketSubscription } from '../../features/home/domain/receive-ws-message.saga';
import { geolocationService } from '../../features/home/utils/services/geolocation-service.utils';
import { getPaymentMethodsSaga } from '../../features/payments/domain/get-payment-methods.saga';
import { profileAPI } from '../../features/profile/data/api/profile-api.data';
import { UserResponse } from '../../features/profile/model/user-response.model';
import { INITIALIZE } from '../data/store/app.actions';

export function* initializationSaga(): SagaIterator {
    yield call(geolocationService.initialize);
    yield spawn(bootstrapWebSocketSubscription);

    const tokens: Tokens = yield call(tokenService.readTokensFromStorage);

    if (tokens) {
        yield call(tokenService.setAuthToken, tokens);
        const newTokens: AuthResponse = yield call(authAPI.refreshToken, tokens.refreshToken);

        if (newTokens.data) {
            yield call(tokenService.writeTokensToStorage, newTokens.data);
            yield call(tokenService.setAuthToken, newTokens.data);

            const user: UserResponse = yield call(profileAPI.getUser);

            if (user.data) {
                yield call(connectionGatewayAPI.setIsClient, !user.data.driver);
                yield call(connectionGatewayAPI.connect);

                yield call(fetchHistorySaga);
                yield call(getPaymentMethodsSaga);

                yield put(LOGIN.COMPLETED(user.data));
            }
        } else {
            yield call(tokenService.deleteTokensFromStorage);
        }
    }

    const key = environmentConfig.get('stripePublishableKey') ?? '';

    if (!key) {
        yield call(toastService.showError, new Error('Не удалось настроить платежную систему'));
    } else {
        yield call(initStripe, { publishableKey: key });
    }

    yield call(splashScreen.hide);
}

export function* listenForInitialization(): SagaIterator {
    yield takeLatest(INITIALIZE, initializationSaga);
}

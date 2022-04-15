import { Optional } from '../core/model/optional.model';
import { Tokens } from '../core/model/tokens.model';
import { User } from '../core/model/user.model';
import { tokenService } from '../core/utils/services/token-service.utils';
import { LoginPayload, RegisterPayload } from '../features/auth/data/store/auth.actions';
import { PaymentMethodType } from '../features/payments/model/method-type.model';

import { mockedHistory, mockedPaymentMethods, mockedTokens, mockedUsers } from './database';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const mockedAvatar = require('../../assets/avatar.jpg');

export const mockedLogin = (data: LoginPayload): Optional<Tokens> => {
    const result = mockedUsers.find((user) => user.email === data.email && user.password === data.password);

    if (!result) {
        return null;
    } else {
        const tokens = {
            token: (Math.random() * 10000).toString(),
            refreshToken: (Math.random() * 10000).toString(),
        };

        mockedTokens[result.id] = tokens;

        return tokens;
    }
};

export const mockedRegister = (data: RegisterPayload): Optional<Tokens> => {
    const result = mockedUsers.find((user) => user.email === data.email && user.password === data.password);

    if (!result) {
        const id = mockedUsers.length + 1;

        mockedUsers.push({
            id: id,
            ...data,
        });

        mockedHistory[id] = [];

        if (!data.driver) {
            mockedPaymentMethods[id] = [
                {
                    id: 1,
                    type: PaymentMethodType.Cash,
                    isDefault: true,
                    details: undefined,
                },
            ];
        }

        const tokens = {
            token: (Math.random() * 10000).toString(),
            refreshToken: (Math.random() * 10000).toString(),
        };

        mockedTokens[id] = tokens;

        return tokens;
    } else {
        return null;
    }
};

export const mockedGetCurrentUser = async (): Promise<Optional<User>> => {
    const tokens = await tokenService.readTokensFromStorage();

    if (!tokens) {
        return null;
    }

    const data = Object.keys(mockedTokens).find((key) => mockedTokens[parseInt(key)].token === tokens.token);

    if (data) {
        return mockedUsers.find((user) => user.id === parseInt(data));
    } else {
        return null;
    }
};

export const mockedRefreshTokens = (refreshToken: string): Optional<Tokens> => {
    const key = Object.keys(mockedTokens).find((key) => mockedTokens[parseInt(key)].refreshToken === refreshToken);

    if (!key) {
        return null;
    } else {
        const tokens = {
            token: (Math.random() * 10000).toString(),
            refreshToken: (Math.random() * 10000).toString(),
        };

        mockedTokens[parseInt(key)] = tokens;

        return tokens;
    }
};

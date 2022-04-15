import { mockedLogin, mockedRefreshTokens, mockedRegister } from '../../../../mocks/users';
import { AuthResponse } from '../../model/auth-response.model';
import { LoginPayload, RegisterPayload } from '../store/auth.actions';

export class AuthAPI {
    login = async (data: LoginPayload): Promise<AuthResponse> => {
        const response = mockedLogin(data);

        if (!response) {
            return {
                status: 200,
                error: Error('Неверная почта или пароль'),
            };
        } else {
            return {
                status: 200,
                data: response,
            };
        }
    };

    register = async (data: RegisterPayload): Promise<AuthResponse> => {
        const response = mockedRegister(data);

        if (!response) {
            return {
                status: 200,
                error: Error('Данная почта или номер телефона уже используется'),
            };
        } else {
            return {
                status: 200,
                data: response,
            };
        }
    };

    refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
        const response = mockedRefreshTokens(refreshToken);

        if (!refreshToken) {
            return {
                status: 200,
                error: Error('Неверный ключ обновления данных'),
            };
        } else {
            return {
                status: 200,
                data: response,
            };
        }
    };
}

export const authAPI = new AuthAPI();

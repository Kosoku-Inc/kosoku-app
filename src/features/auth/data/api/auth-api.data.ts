import {RestGatewayAPI, restGatewayAPI} from '../../../../core/data/api/rest-gateway-api.data';
import { AuthResponse } from '../../model/auth-response.model';
import { LoginPayload, RegisterPayload } from '../store/auth.actions';

export class AuthAPI {
    constructor(private restGatewayAPI: RestGatewayAPI) {}

    login = async (data: LoginPayload): Promise<AuthResponse> => {
        return this.restGatewayAPI.post('/api/v1/auth/login', data);
    };

    register = async (data: RegisterPayload): Promise<AuthResponse> => {
        return this.restGatewayAPI.post('/api/v1/auth/register', data);
    };

    refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
        return this.restGatewayAPI.post('/api/v1/auth/refresh', { refreshToken });
    };
}

export const authAPI = new AuthAPI(restGatewayAPI);

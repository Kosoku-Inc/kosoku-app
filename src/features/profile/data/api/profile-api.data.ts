import { restGatewayAPI } from '../../../../core/data/api/rest-gateway-api.data';
import { UserResponse } from '../../model/user-response.model';

export class ProfileAPI {
    getUser = async (): Promise<UserResponse> => {
        return restGatewayAPI.get('/api/v1/user');
    };
}

export const profileAPI = new ProfileAPI();

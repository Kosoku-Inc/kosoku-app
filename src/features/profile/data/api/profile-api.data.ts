import { mockedGetCurrentUser } from '../../../../mocks/users';
import { UserResponse } from '../../model/user-response.model';

export class ProfileAPI {
    getUser = async (): Promise<UserResponse> => {
        const result = await mockedGetCurrentUser();

        if (result) {
            return {
                status: 200,
                data: result,
            };
        } else {
            return {
                status: 200,
                error: Error('Invalid token'),
            };
        }
    };
}

export const profileAPI = new ProfileAPI();

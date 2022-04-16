import { connectionGatewayAPI } from '../../data/api/connection-gateway-api.data';
import { restGatewayAPI } from '../../data/api/rest-gateway-api.data';
import { Optional } from '../../model/optional.model';
import { Tokens } from '../../model/tokens.model';
import { encryptedStorage } from '../third-party/encrypted-storage.utils';

export class TokenService {
    private storageKey = 'KOSOKU::AUTH_TOKENS';

    readTokensFromStorage = async (): Promise<Optional<Tokens>> => {
        return encryptedStorage.read(this.storageKey);
    };

    writeTokensToStorage = async (tokens: Tokens) => {
        await encryptedStorage.write(this.storageKey, tokens);
    };

    deleteTokensFromStorage = async () => {
        await encryptedStorage.delete(this.storageKey);
    };

    setAuthToken = async (tokens: Tokens) => {
        restGatewayAPI.setAuthToken(tokens.token);
        connectionGatewayAPI.setAuthToken(tokens.token);
    };

    removeAuthToken = async () => {
        restGatewayAPI.setAuthToken('');
        connectionGatewayAPI.setAuthToken('');
    };
}

export const tokenService = new TokenService();

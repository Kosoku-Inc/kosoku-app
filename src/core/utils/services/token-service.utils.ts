import { connectionGatewayAPI } from '../../data/api/connection-gateway-api.data';
import { dataGatewayAPI } from '../../data/api/data-gateway-api.data';
import { paymentGatewayAPI } from '../../data/api/payment-gateway-api.data';
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
        dataGatewayAPI.setAuthToken(tokens.token);
        connectionGatewayAPI.setAuthToken(tokens.token);
        paymentGatewayAPI.setAuthToken(tokens.token);
    };

    removeAuthToken = async () => {
        dataGatewayAPI.setAuthToken('');
        connectionGatewayAPI.setAuthToken('');
        paymentGatewayAPI.setAuthToken('');
    };
}

export const tokenService = new TokenService();

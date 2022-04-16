import { restGatewayAPI } from '../../../../core/data/api/rest-gateway-api.data';
import { HistoryResponse } from '../../model/history-response.model';

export class HistoryAPI {
    getHistory = async (): Promise<HistoryResponse> => {
        return restGatewayAPI.get('/api/v1/user/history');
    };
}

export const historyAPI = new HistoryAPI();

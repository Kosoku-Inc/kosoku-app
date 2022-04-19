import { RestGatewayAPI, restGatewayAPI } from '../../../../core/data/api/rest-gateway-api.data';
import { HistoryResponse } from '../../model/history-response.model';

export class HistoryAPI {
    constructor(private restGatewayAPI: RestGatewayAPI) {}

    getHistory = async (): Promise<HistoryResponse> => {
        return this.restGatewayAPI.get('/api/v1/user/history');
    };
}

export const historyAPI = new HistoryAPI(restGatewayAPI);

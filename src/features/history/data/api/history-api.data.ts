import { mockedGetHistory } from '../../../../mocks/history';
import { HistoryResponse } from '../../model/history-response.model';

export class HistoryAPI {
    getHistory = async (): Promise<HistoryResponse> => {
        const result = await mockedGetHistory();

        if (result) {
            return {
                status: 200,
                data: result,
            };
        } else {
            return {
                status: 200,
                error: new Error('Неизвестный пользователь'),
            };
        }
    };
}

export const historyAPI = new HistoryAPI();

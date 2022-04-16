import { AxiosInstance } from 'axios';

import { Optional } from '../../model/optional.model';
import { Response } from '../../model/response.model';

export abstract class BaseAPI {
    abstract axios: AxiosInstance;

    post = async <K, T>(endpoint: string, data: K): Promise<Response<T>> => {
        try {
            const result = await this.axios.post(endpoint, data);
            const _data = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;

            if (_data.error) {
                return {
                    status: 400,
                    error: new Error(_data.error),
                };
            }

            return {
                status: result.status,
                data: _data,
            };
        } catch (e) {
            return {
                status: 400,
                error: e as Error,
            };
        }
    };

    get = async <K, T>(endpoint: string, params?: Optional<K>): Promise<Response<T>> => {
        try {
            const result = await this.axios.get(endpoint, {
                params,
            });

            const _data = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;

            if (_data.error || _data.message) {
                return {
                    status: 400,
                    error: new Error(_data.error || _data.message),
                };
            }

            return {
                status: result.status,
                data: _data,
            };
        } catch (e) {
            return {
                status: 400,
                error: e as Error,
            };
        }
    };
}

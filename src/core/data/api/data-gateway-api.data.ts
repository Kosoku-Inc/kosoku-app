import axios, { AxiosInstance } from 'axios';

import { environmentConfig } from '../../utils/third-party/environment-config.utils';

import { BaseAPI } from './base-api.data';

export class DataGatewayAPI extends BaseAPI {
    private authToken = '';
    axios: AxiosInstance;

    constructor() {
        super();
        this.axios = this.initialize();
    }

    private initialize = (): AxiosInstance => {
        const _axios = axios.create({
            baseURL: environmentConfig.get('dataGatewayAPI'),
            timeout: 60000,
        });

        _axios.interceptors.request.use((config) => {
            if (this.authToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: 'Bearer ' + this.authToken,
                };
            }

            return config;
        });

        return _axios;
    };

    setAuthToken = (token: string) => {
        this.authToken = token;
        this.axios = this.initialize();
    };
}

export const dataGatewayAPI = new DataGatewayAPI();
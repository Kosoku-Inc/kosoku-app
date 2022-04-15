import axios, { AxiosInstance } from 'axios';

import { environmentConfig } from '../../utils/third-party/environment-config.utils';

import { BaseAPI } from './base-api.data';

export class DirectionsGatewayAPI extends BaseAPI {
    axios: AxiosInstance;

    constructor() {
        super();
        this.axios = axios.create({
            baseURL: environmentConfig.get('directionsGatewayAPI'),
            timeout: 60000,
        });
    }
}

export const directionsGatewayAPI = new DirectionsGatewayAPI();

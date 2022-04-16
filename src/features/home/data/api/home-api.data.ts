import { connectionGatewayAPI, WSMessageType } from '../../../../core/data/api/connection-gateway-api.data';
import { restGatewayAPI } from '../../../../core/data/api/rest-gateway-api.data';
import { Location } from '../../model/location.model';
import { DecodeResponse } from '../../model/network.model';

export class HomeAPI {
    decode = async (location: Location): Promise<DecodeResponse> => {
        return restGatewayAPI.post('/api/v1/maps/decode', { location });
    };

    updateMyLocation = async (location: Location) => {
        return connectionGatewayAPI.send(WSMessageType.LocationUpdate, location);
    };
}

export const homeAPI = new HomeAPI();

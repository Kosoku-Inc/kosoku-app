import {connectionGatewayAPI, WSMessageType} from '../../../../core/data/api/connection-gateway-api.data';
import {directionsGatewayAPI} from '../../../../core/data/api/directions-gateway-api.data';
import {Location} from '../../model/location.model';
import {DecodeResponse} from '../../model/network.model';

export class HomeAPI {
    decode = async (location: Location): Promise<DecodeResponse> => {
        return directionsGatewayAPI.post('/decode', { location });
    };

    updateMyLocation = async (location: Location) => {
        return connectionGatewayAPI.send(WSMessageType.LocationUpdate, location);
    };
}

export const homeAPI = new HomeAPI();

import {
    ConnectionGatewayAPI,
    connectionGatewayAPI,
    WSMessageType,
} from '../../../../core/data/api/connection-gateway-api.data';
import {RestGatewayAPI, restGatewayAPI} from '../../../../core/data/api/rest-gateway-api.data';
import { ExtendedRideRequest, RideStatus } from '../../../../core/model/ride.model';
import { ExtendedLocation, Location } from '../../model/location.model';
import { DecodeResponse, DirectionsResponse, PlacesResponse } from '../../model/network.model';

export class HomeAPI {
    constructor(private restGatewayAPI: RestGatewayAPI, private connectionGatewayAPI: ConnectionGatewayAPI) {}

    decode = async (location: Location): Promise<DecodeResponse> => {
        return this.restGatewayAPI.post('/api/v1/maps/decode', { location });
    };

    updateMyLocation = async (location: Location) => {
        return this.connectionGatewayAPI.send(WSMessageType.LocationUpdate, location);
    };

    requestRide = async (data: ExtendedRideRequest) => {
        return this.connectionGatewayAPI.send(WSMessageType.RideRequest, data);
    };

    answerToRideRequest = async (answer: WSMessageType) => {
        return this.connectionGatewayAPI.send(answer, { type: answer });
    };

    fetchPlaces = async (toSearch: string): Promise<PlacesResponse> => {
        return this.restGatewayAPI.post('/api/v1/maps/places', { toSearch });
    };

    calculateRideData = async (to: ExtendedLocation, from: ExtendedLocation): Promise<DirectionsResponse> => {
        return this.restGatewayAPI.post('/api/v1/maps/direction', { to, from });
    };

    declineRideRequest = async () => {
        return this.connectionGatewayAPI.send(WSMessageType.RideStopSearch, { type: WSMessageType.RideStopSearch });
    };

    updateRideStatus = async (status: RideStatus) => {
        return this.connectionGatewayAPI.send(WSMessageType.RideStatusChange, status);
    };
}

export const homeAPI = new HomeAPI(restGatewayAPI, connectionGatewayAPI);

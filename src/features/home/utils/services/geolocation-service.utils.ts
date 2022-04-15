import Geolocation, {
    GeolocationError,
    GeolocationOptions,
    GeolocationResponse,
} from '@react-native-community/geolocation';

import { logger } from '../../../../core/utils/logger.utils';
import { Location } from '../../model/location.model';

export class GeolocationService {
    private commonGeolocationOptions: GeolocationOptions = {
        enableHighAccuracy: true,
    };

    initialize = () => {
        Geolocation.setRNConfiguration({
            authorizationLevel: 'whenInUse',
            skipPermissionRequests: false,
        });

        Geolocation.requestAuthorization();
    };

    getLocation = async (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (result: GeolocationResponse) => {
                    resolve({
                        latitude: result.coords.latitude,
                        longitude: result.coords.longitude,
                    });
                },
                (error: GeolocationError) => {
                    reject(error);
                },
                this.commonGeolocationOptions
            );
        });
    };

    subscribeToPositionChange = (listener: (data: Location) => void): (() => void) => {
        const subID = Geolocation.watchPosition(
            (location) => {
                listener({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            },
            logger.log,
            this.commonGeolocationOptions
        );

        return () => Geolocation.clearWatch(subID);
    };
}

export const geolocationService = new GeolocationService();

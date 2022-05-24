import Geolocation, {
    GeolocationError,
    GeolocationOptions,
    GeolocationResponse,
} from '@react-native-community/geolocation';

import { logger } from '../../../../core/utils/logger.utils';
import { Location } from '../../model/location.model';
import {Platform} from 'react-native';

export class GeolocationService {
    latestLocation: Location | null = null;

    private commonGeolocationOptions: GeolocationOptions = {
        enableHighAccuracy: true,
    };

    initialize = () => {
        Geolocation.setRNConfiguration({
            authorizationLevel: 'whenInUse',
            skipPermissionRequests: false,
        });

        if(Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
        }
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
                    if (this.latestLocation) {
                        resolve(this.latestLocation);
                    } else {
                        reject(error);
                    }
                },
                {
                    ...this.commonGeolocationOptions,
                    timeout: 5000,
                }
            );
        });
    };

    subscribeToPositionChange = (listener: (data: Location) => void): (() => void) => {
        const subID = Geolocation.watchPosition(
            (location) => {
                this.latestLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };

                listener({ ...this.latestLocation });
            },
            logger.log,
            this.commonGeolocationOptions
        );

        return () => Geolocation.clearWatch(subID);
    };
}

export const geolocationService = new GeolocationService();

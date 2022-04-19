import React from 'react';
import MapView from 'react-native-maps';

import { Location } from '../../model/location.model';
import { prepareRideSnaps } from '../hooks/use-map-setup.utils';

class MapService {
    private map = React.createRef<MapView>();

    getMapRef = () => this.map;

    animateCamera = (location: Location, zoom?: number) => {
        this.map.current?.animateCamera(
            {
                center: location,
                zoom,
            },
            {
                duration: 400,
            }
        );
    };

    animateToRegion = (location1: Location, location2: Location) => {
        this.map.current?.fitToCoordinates([location1, location2], {
            animated: true,
            edgePadding: {
                top: 70,
                bottom: prepareRideSnaps[0] + 20,
                left: 50,
                right: 50,
            },
        });
    };
}

export const mapService = new MapService();

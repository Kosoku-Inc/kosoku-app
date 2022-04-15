import React from 'react';
import MapView from 'react-native-maps';

import { Location } from '../../model/location.model';

class MapService {
    private map = React.createRef<MapView>();

    getMapRef = () => this.map;

    animateToRegion = (location: Location, zoom: number) => {
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
}

export const mapService = new MapService();

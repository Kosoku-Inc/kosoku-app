import { LatLng } from 'react-native-maps';

export type Location = LatLng;

export type ExtendedLocation = Location & {
    readableLocation?: string;
};

import { CarClass } from '../../../core/model/car-class.model';
import { Response } from '../../../core/model/response.model';
import { RideRequest } from '../../../core/model/ride.model';

import { ExtendedLocation } from './location.model';

export type DecodeResponse = Response<ExtendedLocation>;

export type PlacesResponse = Response<Array<ExtendedLocation>>;

export type DirectionsResponse = Response<RideRequest>;

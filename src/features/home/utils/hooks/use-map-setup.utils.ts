import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getExistingUser } from '../../../../core/data/store/user.selectors';
import { INITIALIZE_MAP, POINTER_MOVE, SET_CHOSEN_LOCATION } from '../../data/store/home.actions';
import {
    getIsChoosingRoute,
    getIsDriverIdle,
    getIsUserOnRide,
    getIsDriverRequested,
    getIsPointerMoving,
} from '../../data/store/home.selectors';
import { Location } from '../../model/location.model';
import { PointerRef } from '../../presentation/components/pointer/pointer.component';

export type MapUtils = {
    onRegionChange: (location: Location) => void;
    onRegionChangeComplete: (location: Location) => void;
    pointerRef: React.MutableRefObject<PointerRef | null>;
    snapPoints: Array<string | number>;
};

// User snaps
export const chooseRouteClientSnaps = [Dimensions.get('window').height * 0.15, Dimensions.get('window').height * 0.88];
export const revertChooseRouteClientSnaps = [
    Dimensions.get('window').height * 0.85,
    Dimensions.get('window').height * 0.12,
];
export const prepareRideSnaps = [300];

// Driver snaps
export const idleSnaps = ['10%'];
export const requestedSnaps = ['35%'];
export const onRideSnaps = [300];

export const useMapSetup = (): MapUtils => {
    const dispatch = useDispatch();
    const wasStarted = useRef(false);
    const isPointerMoving = useSelector(getIsPointerMoving);
    const pointerRef = useRef<PointerRef | null>(null);
    const user = useSelector(getExistingUser);
    const isChoosingRoute = useSelector(getIsChoosingRoute);

    const isDriverIdle = useSelector(getIsDriverIdle);
    const isDriverRequested = useSelector(getIsDriverRequested);
    const isUserOnRide = useSelector(getIsUserOnRide);

    const snapPoints = useMemo(
        () =>
            user?.driver
                ? isDriverIdle
                    ? idleSnaps
                    : isDriverRequested
                    ? requestedSnaps
                    : isUserOnRide
                    ? onRideSnaps
                    : idleSnaps
                : isChoosingRoute
                ? chooseRouteClientSnaps
                : prepareRideSnaps,
        [user, isChoosingRoute, isUserOnRide, isDriverIdle, isDriverRequested]
    );

    useEffect(() => {
        dispatch(INITIALIZE_MAP.TRIGGER());
        // eslint-disable-next-line
    }, []);

    const onRegionChange = useCallback(() => {
        if (!wasStarted.current || !isPointerMoving) {
            if (!wasStarted.current) {
                wasStarted.current = true;
                pointerRef.current?.start();
            }

            dispatch(POINTER_MOVE.START());
        }
    }, [dispatch, isPointerMoving]);

    const onRegionChangeComplete = useCallback(
        (location: Location) => {
            wasStarted.current = false;
            pointerRef.current?.stop();
            dispatch(POINTER_MOVE.STOP());
            dispatch(SET_CHOSEN_LOCATION.TRIGGER(location));
        },
        [dispatch]
    );

    return {
        onRegionChange,
        onRegionChangeComplete,
        pointerRef,
        snapPoints,
    };
};

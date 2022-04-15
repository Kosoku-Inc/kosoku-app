import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { INITIALIZE_MAP, POINTER_MOVE, SET_CHOSEN_LOCATION } from '../../data/store/home.actions';
import { getIsPointerMoving } from '../../data/store/home.selectors';
import { Location } from '../../model/location.model';
import { PointerRef } from '../../presentation/components/pointer/pointer.component';

export type MapUtils = {
    onRegionChange: (location: Location) => void;
    onRegionChangeComplete: (location: Location) => void;
    pointerRef: React.MutableRefObject<PointerRef | null>;
};

export const useMapSetup = (): MapUtils => {
    const dispatch = useDispatch();
    const wasStarted = useRef(false);
    const isPointerMoving = useSelector(getIsPointerMoving);
    const pointerRef = useRef<PointerRef | null>(null);

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
    };
};

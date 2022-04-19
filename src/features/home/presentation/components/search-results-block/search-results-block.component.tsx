import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SET_ROUTE_LOCATION } from '../../../data/store/home.actions';
import {
    getChooseRouteFromSearchResults,
    getChooseRouteLatestTyping,
    getChooseRouteToSearchResults,
} from '../../../data/store/home.selectors';
import { ExtendedLocation } from '../../../model/location.model';
import { getDistance } from '../../../utils/geo-distance.utils';
import { geolocationService } from '../../../utils/services/geolocation-service.utils';

import { Readable, SearchResultWrapper } from './search-results-block.styled';

export const SearchResultsBlock: React.FC = () => {
    const toResults = useSelector(getChooseRouteToSearchResults);
    const fromResults = useSelector(getChooseRouteFromSearchResults);
    const latest = useSelector(getChooseRouteLatestTyping);
    const dispatch = useDispatch();

    const toRender = useMemo(() => {
        const selected = latest === 'from' ? fromResults : toResults;
        const location = geolocationService.latestLocation;

        if (!location) return selected;

        return [...selected].sort((a, b) => {
            return (
                getDistance(location.latitude, location.longitude, a.latitude, a.longitude, 'K') -
                getDistance(location.latitude, location.longitude, b.latitude, b.longitude, 'K')
            );
        });
    }, [latest, fromResults, toResults]);

    const onResultPress = useCallback(
        (item: ExtendedLocation) => {
            dispatch(SET_ROUTE_LOCATION.TRIGGER({ [latest as string]: item }));
        },
        [dispatch, latest]
    );

    if (!latest) return null;

    return (
        <BottomSheetFlatList
            data={toRender}
            keyExtractor={(item) => `${item.latitude}${item.longitude}`}
            contentContainerStyle={{ marginTop: 25 }}
            renderItem={({ item }) => (
                <SearchResultWrapper onPress={() => onResultPress(item)}>
                    <Readable>{item.readableLocation}</Readable>
                    {!!geolocationService.latestLocation && (
                        <Readable>
                            {getDistance(
                                item.latitude,
                                item.longitude,
                                geolocationService.latestLocation.latitude,
                                geolocationService.latestLocation.longitude,
                                'K'
                            ).toFixed(2)}{' '}
                            км
                        </Readable>
                    )}
                </SearchResultWrapper>
            )}
        />
    );
};

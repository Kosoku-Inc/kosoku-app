import React, { useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import { TextInput } from '../../../../../core/presentation/text-input/text-input.component';
import { FETCH_PLACES, SET_ROUTE_LOCATION } from '../../../data/store/home.actions';
import {
    getChooseRouteFromLocation,
    getChooseRouteToLocation,
    getPointerLocationData,
} from '../../../data/store/home.selectors';
import { revertChooseRouteClientSnaps } from '../../../utils/hooks/use-map-setup.utils';
import { bottomSheetService } from '../../../utils/services/bottom-sheet-service.utils';
import { SearchResultsBlock } from '../search-results-block/search-results-block.component';

import { SearchBlockWrapper, TextInputWrapper } from './search-block.styled';

export type SearchBlockProps = {
    animatedSheetPosition: Animated.SharedValue<number>;
};

const delta = Dimensions.get('window').height * 0.5;

export const SearchBlock: React.FC<SearchBlockProps> = (props: SearchBlockProps) => {
    const pointerPosition = useSelector(getPointerLocationData);
    const dispatch = useDispatch();
    const from = useSelector(getChooseRouteFromLocation);
    const to = useSelector(getChooseRouteToLocation);

    const fromWrapperStyle = useAnimatedStyle(() => ({
        marginTop: interpolate(props.animatedSheetPosition.value, revertChooseRouteClientSnaps, [-60, 0]),
        opacity: interpolate(
            props.animatedSheetPosition.value,
            [revertChooseRouteClientSnaps[0] - delta, revertChooseRouteClientSnaps[1]],
            [0, 1]
        ),
    }));

    useEffect(() => {
        if (pointerPosition) {
            dispatch(SET_ROUTE_LOCATION.TRIGGER({ from: pointerPosition }));
        }
    }, [pointerPosition, dispatch]);

    const onChangeText = useCallback(
        (direction: 'to' | 'from', toSearch: string) => {
            dispatch(FETCH_PLACES.TRIGGER({ direction, toSearch }));
        },
        [dispatch]
    );

    return (
        <SearchBlockWrapper>
            <TextInputWrapper style={fromWrapperStyle}>
                <TextInput
                    placeholder={'Откуда едем?'}
                    onFocus={bottomSheetService.expand}
                    defaultValue={from?.readableLocation}
                    onChangeText={(text) => onChangeText('from', text)}
                />
            </TextInputWrapper>
            <TextInput
                placeholder={'Куда едем?'}
                onFocus={bottomSheetService.expand}
                defaultValue={to?.readableLocation}
                onChangeText={(text) => onChangeText('to', text)}
            />
            <SearchResultsBlock />
        </SearchBlockWrapper>
    );
};

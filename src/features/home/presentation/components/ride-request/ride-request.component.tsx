import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WSMessageType } from '../../../../../core/data/api/connection-gateway-api.data';
import { Button } from '../../../../../core/presentation/button/button.component';
import { colors } from '../../../../../core/utils/theme/colors.utils';
import { defaultShadow } from '../../../../../core/utils/theme/shadows.utils';
import { ANSWER_TO_RIDE_REQUEST } from '../../../data/store/home.actions';
import { getDriverRideRequest } from '../../../data/store/home.selectors';

import { RideRequestWrapper, TextWrapper, Title, Subtitle } from './ride-request.styled';

export const RideRequest: React.FC = () => {
    const rideRequest = useSelector(getDriverRideRequest);
    const dispatch = useDispatch();

    const answer = useCallback(
        (answer: WSMessageType) => {
            dispatch(ANSWER_TO_RIDE_REQUEST(answer));
        },
        [dispatch]
    );

    if (!rideRequest) return null;

    return (
        <RideRequestWrapper>
            <TextWrapper>
                <Title>Новый заказ, {rideRequest.cost} рублей</Title>
                <Subtitle>
                    {rideRequest.to.readableLocation}, ~{rideRequest.calculatedTime} минут
                </Subtitle>
            </TextWrapper>
            <Button title={'Принять'} onPress={() => answer(WSMessageType.RideAccept)} />
            {/* eslint-disable-next-line react-native/no-color-literals */}
            <Button
                style={{ backgroundColor: colors.white, ...defaultShadow, marginTop: -4 }}
                title={'Отменить'}
                textStyle={{ color: colors.darkerGrey }}
                onPress={() => answer(WSMessageType.RideDecline)}
            />
        </RideRequestWrapper>
    );
};

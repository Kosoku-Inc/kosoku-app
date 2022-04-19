import React from 'react';
import { useSelector } from 'react-redux';

import { getIsDriver } from '../../../../../core/data/store/user.selectors';
import { RideStatus } from '../../../../../core/model/ride.model';
import {
    getIsCarSearching,
    getIsChoosingRoute,
    getIsPointerLocationLoading,
    getIsPointerMoving,
    getPointerLocationData,
    getRideStatus,
} from '../../../data/store/home.selectors';

import { StatusText } from './status.styled';

export const Status: React.FC = () => {
    const isLoading = useSelector(getIsPointerLocationLoading);
    const isMoving = useSelector(getIsPointerMoving);
    const isDriver = useSelector(getIsDriver);
    const data = useSelector(getPointerLocationData);
    const isChoosingRoute = useSelector(getIsChoosingRoute);

    if (isDriver || !isChoosingRoute) return null;

    return isLoading || isMoving ? (
        <StatusText>Вычисляем...</StatusText>
    ) : data ? (
        <>
            <StatusText>Выбранная точка:</StatusText>
            <StatusText>{data.readableLocation}</StatusText>
        </>
    ) : (
        <StatusText>Ошибка, попробуйте снова</StatusText>
    );
};

import React from 'react';
import { useSelector } from 'react-redux';

import {
    getIsPointerLocationLoading,
    getIsPointerMoving,
    getPointerLocationData,
} from '../../../data/store/home.selectors';

import { StatusText } from './status.styled';

export const Status: React.FC = () => {
    const isLoading = useSelector(getIsPointerLocationLoading);
    const isMoving = useSelector(getIsPointerMoving);
    const data = useSelector(getPointerLocationData);

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

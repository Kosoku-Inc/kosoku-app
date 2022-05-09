import React from 'react';

import { toReadableCarClass } from '../../../../../core/utils/formatters/car-class.utils';
import { toReadableDate, toReadableTime } from '../../../../../core/utils/formatters/time.utils';
import { Order } from '../../../model/order.model';

import {
    DriverDetailsWrapper,
    OrderTileWrapper,
    PrimaryDetailsWrapper,
    Title,
    Route,
    Time,
    Driver,
} from './order-tile.styled';

export type OrderTileProps = {
    order: Order;
};

export const OrderTile: React.FC<OrderTileProps> = (props: OrderTileProps) => {
    console.log(props.order);

    return (
        <OrderTileWrapper>
            <Title>Поездка #{props.order.id}</Title>
            <PrimaryDetailsWrapper>
                <Route>
                    Маршрут: {props.order.from} → {props.order.to}
                </Route>
                <Time>
                    Время: {toReadableTime(props.order.startTime)} - {toReadableTime(props.order.endTime)},{'  '}
                    {toReadableDate(props.order.startTime)}
                </Time>
            </PrimaryDetailsWrapper>
            <DriverDetailsWrapper>
                <Driver>
                    Водитель: {props.order.driver?.firstName} {props.order.driver?.lastName}
                </Driver>
                <Driver>Машина: {props.order.driver?.driver?.carBrand}</Driver>
                <Driver>Класс: {toReadableCarClass(props.order.driver?.driver?.carClass)}</Driver>
            </DriverDetailsWrapper>
        </OrderTileWrapper>
    );
};

import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RideStatus } from '../../../../../core/model/ride.model';
import { User } from '../../../../../core/model/user.model';
import { Button } from '../../../../../core/presentation/button/button.component';
import { defaultTheme } from '../../../../../core/utils/theme/themes.utils';
import { SET_RIDE_STATUS } from '../../../data/store/home.actions';
import { getRideClient, getRideStatus } from '../../../data/store/home.selectors';
import { UserCard } from '../user-card/user-card.component';

export const DriverOnRideStatus: React.FC = () => {
    const rideStatus = useSelector(getRideStatus);
    const buttonTitle = useMemo(
        () => (rideStatus === RideStatus.Starting ? 'Начать поездку' : 'Завершить поездку'),
        [rideStatus]
    );
    const client = useSelector(getRideClient) as User;
    const dispatch = useDispatch();

    const handleButtonPress = useCallback(() => {
        if (rideStatus === RideStatus.Starting) {
            dispatch(SET_RIDE_STATUS.TRIGGER(RideStatus.InProgress));
        }
        if (rideStatus === RideStatus.InProgress) {
            dispatch(SET_RIDE_STATUS.TRIGGER(RideStatus.Completed));
        }
    }, [rideStatus, dispatch]);

    return (
        <View style={{ marginBottom: defaultTheme.spacer, flex: 1 }}>
            <UserCard user={client} />
            <Button title={buttonTitle} onPress={handleButtonPress} />
        </View>
    );
};

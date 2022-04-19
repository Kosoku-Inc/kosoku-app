import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RideStatus } from '../../../../../core/model/ride.model';
import { User } from '../../../../../core/model/user.model';
import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';
import { defaultTheme } from '../../../../../core/utils/theme/themes.utils';
import { getRideDriver, getRideStatus } from '../../../data/store/home.selectors';
import { UserCard } from '../user-card/user-card.component';

export const CustomerRideStatus: React.FC = () => {
    const rideStatus = useSelector(getRideStatus);
    const driver = useSelector(getRideDriver) as User;

    const title = useMemo(
        () =>
            rideStatus === RideStatus.Starting
                ? 'Водитель уже едет к Вам!'
                : rideStatus === RideStatus.InProgress
                ? 'Мы в пути!'
                : 'У нас сбой, повторите попозже',
        [rideStatus]
    );

    return (
        <View style={{ marginBottom: defaultTheme.spacer * 4, flex: 1 }}>
            <Text
                style={{
                    fontFamily: getFontName(FontType.semibold),
                    fontSize: 18,
                    marginHorizontal: defaultTheme.spacer * 2,
                    marginVertical: defaultTheme.spacer,
                }}
            >
                {title}
            </Text>
            <UserCard user={driver} />
        </View>
    );
};

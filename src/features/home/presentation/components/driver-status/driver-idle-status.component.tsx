import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { getExistingUser } from '../../../../../core/data/store/user.selectors';
import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';

export const DriverIdleStatus: React.FC = () => {
    const user = useSelector(getExistingUser);

    return (
        <Text
            style={{
                fontFamily: getFontName(FontType.semibold),
                alignSelf: 'center',
                marginTop: 2,
            }}
        >
            Приветствуем, {user.firstName}!
        </Text>
    );
};

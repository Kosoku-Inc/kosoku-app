import React from 'react';

import { User } from '../../../../../core/model/user.model';
import { Avatar } from '../../../../../core/presentation/avatar/avatar.styled';
import { toReadableCarClass } from '../../../../../core/utils/formatters/car-class.utils';
import { mockedAvatar } from '../../../../../mocks/users';

import { UserCardWrapper, TextInfoWrapper, Name, PersonalData } from './user-card.styled';
import { defaultTheme } from '../../../../../core/utils/theme/themes.utils';

export type UserCardProps = {
    user: User;
};

export const UserCard: React.FC<UserCardProps> = (props: UserCardProps) => {
    return (
        <UserCardWrapper>
            <Avatar source={mockedAvatar} />
            <TextInfoWrapper>
                <Name>
                    {props.user.firstName} {props.user.lastName}
                </Name>
                <PersonalData>Телефон: {props.user.phone}</PersonalData>
                <PersonalData>Почта: {props.user.email}</PersonalData>
                {!!props.user.driver && (
                    <>
                        <Name style={{ marginTop: defaultTheme.spacer }}>Машина</Name>
                        <PersonalData>Модель: {props.user.driver.carBrand}</PersonalData>
                        <PersonalData>Класс: {toReadableCarClass(props.user.driver.carClass)}</PersonalData>
                    </>
                )}
            </TextInfoWrapper>
        </UserCardWrapper>
    );
};

import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { HeaderWrapper, HeaderTitle, BackButton, backButtonImage, BackButtonPressable } from './header.styled';

export type HeaderProps = {
    title: string;
    disabled?: boolean;
};

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const navigation = useNavigation();

    return (
        <HeaderWrapper>
            <BackButtonPressable onPress={props.disabled ? undefined : navigation.goBack}>
                <BackButton source={backButtonImage} />
            </BackButtonPressable>
            {!!props.title && <HeaderTitle>{props.title}</HeaderTitle>}
        </HeaderWrapper>
    );
};

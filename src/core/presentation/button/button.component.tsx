import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { colors } from '../../utils/theme/colors.utils';

import { ButtonText, ButtonWrapper } from './button.styled';

export type ButtonProps = {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <ButtonWrapper onPress={props.onPress} disabled={props.isLoading} style={props.style}>
            {props.isLoading ? (
                <ActivityIndicator color={colors.white} style={{ height: 21.8 }} />
            ) : (
                <ButtonText>{props.title}</ButtonText>
            )}
        </ButtonWrapper>
    );
};

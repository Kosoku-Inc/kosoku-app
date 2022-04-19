import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { colors } from '../../utils/theme/colors.utils';

import { ButtonText, ButtonWrapper } from './button.styled';

export type ButtonProps = {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <ButtonWrapper onPress={props.onPress} disabled={props.isLoading || props.disabled} style={props.style}>
            {props.isLoading ? (
                <ActivityIndicator color={colors.white} style={{ height: 21.8 }} />
            ) : (
                <ButtonText style={props.textStyle}>{props.title}</ButtonText>
            )}
        </ButtonWrapper>
    );
};

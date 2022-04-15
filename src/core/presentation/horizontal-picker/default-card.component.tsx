import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

import { DefaultCardWrapper, Icon, Title } from './default-card.styled';

export type DefaultCardProps = {
    title: string;
    asset?: number;
    iconStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
};

export const DefaultCart: React.FC<DefaultCardProps> = (props: DefaultCardProps) => {
    return (
        <DefaultCardWrapper style={props.style}>
            {!!props.asset && <Icon source={props.asset} style={props.iconStyle} />}
            <Title enableMargins={!!props.asset}>{props.title}</Title>
        </DefaultCardWrapper>
    );
};

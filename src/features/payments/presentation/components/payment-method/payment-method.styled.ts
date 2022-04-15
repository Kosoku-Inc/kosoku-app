import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { Optional } from '../../../../../core/model/optional.model';
import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';
import { defaultShadow } from '../../../../../core/utils/theme/shadows.utils';

export const width = Dimensions.get('window').width;

export const PaymentMethodWrapper = styled.Pressable<{ isDefault?: Optional<boolean> }>`
    margin-top: 5px;
    padding: ${(props) => props.theme.spacer * 2}px;
    margin-vertical: ${(props) => props.theme.spacer * 2}px;
    background-color: white;
    opacity: ${(props) => (props.isDefault ? 1 : 0.5)};
    margin-horizontal: ${(props) => props.theme.spacer * 2}px;
    border-radius: ${(props) => props.theme.spacer * 2}px;
    width: ${(props) => width - props.theme.spacer * 4}px;
    flex-direction: row;
    align-items: center;
`;

export const TextHolder = styled.View`
    flex: 1;
    margin-left: ${(props) => props.theme.spacer * 2}px;
`;

export const Name = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 16px;
`;

export const AdditionalInfo = styled.Text`
    font-family: ${getFontName(FontType.regular)};
    font-size: 14px;
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const PressableText = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    color: ${(props) => props.theme.colors.error};
    font-size: 16px;
`;

export const Icon = styled.Image`
    height: 30px;
    width: 30px;
`;

Icon.defaultProps = {
    resizeMode: 'contain',
};

PaymentMethodWrapper.defaultProps = {
    style: {
        ...defaultShadow,
    },
};

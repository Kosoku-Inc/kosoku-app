import styled from 'styled-components/native';

import { FontType, getFontName } from '../../utils/theme/fonts.utils';
import { defaultShadow } from '../../utils/theme/shadows.utils';

export const ButtonWrapper = styled.Pressable`
    background-color: ${(props) => props.theme.colors.contrast};
    border-radius: ${(props) => props.theme.spacer * 2}px;
    margin: ${(props) => props.theme.spacer * 2}px;
    padding: ${(props) => props.theme.spacer * 2.3}px;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: ${getFontName(FontType.regular)};
    font-size: 18px;
    color: ${(props) => props.theme.colors.background};
`;

ButtonWrapper.defaultProps = {
    style: {
        ...defaultShadow,
    },
};

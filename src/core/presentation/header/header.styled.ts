import styled from 'styled-components/native';

import { FontType, getFontName } from '../../utils/theme/fonts.utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const backButtonImage = require('../../../../assets/icons/back.png');

export const HeaderWrapper = styled.View`
    width: 100%;
    margin: ${(props) => props.theme.spacer * 2}px;
`;

export const HeaderTitle = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 28px;
    margin-left: ${(props) => props.theme.spacer}px;
`;

export const BackButtonPressable = styled.Pressable`
    margin-bottom: ${(props) => props.theme.spacer * 2}px;
`;

export const BackButton = styled.Image`
    width: 25px;
    height: 25px;
`;

BackButton.defaultProps = {
    resizeMode: 'cover',
};

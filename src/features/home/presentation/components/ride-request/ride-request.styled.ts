import styled from 'styled-components/native';

import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';

export const RideRequestWrapper = styled.View``;

export const TextWrapper = styled.View`
    padding: ${(props) => props.theme.spacer * 2}px;
`;

export const Title = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 18px;
`;

export const Subtitle = styled.Text`
    font-family: ${getFontName(FontType.regular)};
    margin-top: 4px;
    font-size: 16px;
`;

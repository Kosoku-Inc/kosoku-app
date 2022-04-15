import styled from 'styled-components/native';

import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';

export const StatusText = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 16px;
`;

export const StatusWrapper = styled.View`
    position: absolute;
    width: 100%;
    align-items: center;
    margin-top: ${(props) => props.theme.spacer}px;
`;

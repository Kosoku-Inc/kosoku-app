import styled from 'styled-components/native';

import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';
import { defaultShadow } from '../../../../../core/utils/theme/shadows.utils';

export const OrderTileWrapper = styled.View`
    margin-top: 5px;
    margin-bottom: ${(props) => props.theme.spacer * 2}px;
    background-color: white;
    margin-horizontal: ${(props) => props.theme.spacer * 2}px;
    border-radius: ${(props) => props.theme.spacer * 2}px;
`;

export const Title = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 17px;
    padding: ${(props) => props.theme.spacer * 2}px;
`;

export const Route = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 16px;
`;

export const Time = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 15px;
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const Driver = styled.Text`
    font-family: ${getFontName(FontType.regular)};
    font-size: 14px;
`;

export const PrimaryDetailsWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.spacer * 2}px;
`;

export const DriverDetailsWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.background};
    opacity: 0.5;
    padding: ${(props) => props.theme.spacer * 2}px;
`;

OrderTileWrapper.defaultProps = {
    style: {
        ...defaultShadow,
    },
};

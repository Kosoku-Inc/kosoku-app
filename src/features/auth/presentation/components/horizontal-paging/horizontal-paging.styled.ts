import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const width = Dimensions.get('window').width;

export const HorizontalPaging = styled.ScrollView`
    width: ${width}px;
`;

export const PagingWrapper = styled.View`
    height: 150px;
    margin-left: -${(props) => props.theme.spacer * 2}px;
`;

export const Page = styled.View`
    width: ${width}px;
    height: 100%;
    padding-horizontal: ${(props) => props.theme.spacer * 2}px;
`;

HorizontalPaging.defaultProps = {
    pagingEnabled: true,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    scrollEnabled: false,
};

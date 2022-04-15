import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { defaultShadow } from '../../../../../core/utils/theme/shadows.utils';

const width = Dimensions.get('window').width;

export const ProfileTileWrapper = styled.View`
    margin-top: 5px;
    margin-vertical: ${(props) => props.theme.spacer * 2}px;
    background-color: white;
    margin-horizontal: ${(props) => props.theme.spacer * 2}px;
    border-radius: ${(props) => props.theme.spacer * 2}px;
    width: ${(props) => width - props.theme.spacer * 4}px;
`;

export const DataWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.spacer * 2}px;
    height: 100px;
    border-bottom-left-radius: ${(props) => props.theme.spacer * 2}px;
    border-bottom-right-radius: ${(props) => props.theme.spacer * 2}px;
    justify-content: space-between;
`;

ProfileTileWrapper.defaultProps = {
    style: {
        ...defaultShadow,
    },
};

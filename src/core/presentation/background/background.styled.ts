import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { colors } from '../../utils/theme/colors.utils';

export const SafeBackground = styled(SafeAreaView)`
    flex: 1;
    background-color: ${() => colors.white};
`;

export const Background = styled.View<{ disableMargins?: boolean }>`
    flex: 1;
    background-color: ${() => colors.white};
    margin: ${(props) => (props.disableMargins ? 0 : props.theme.spacer * 2)}px;
`;

import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const SearchBlockWrapper = styled.KeyboardAvoidingView`
    flex: 1;
`;

export const TextInputWrapper = styled(Animated.View)`
    margin-vertical: ${(props) => props.theme.spacer}px;
`;

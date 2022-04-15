import styled from 'styled-components/native';

export const PickerWrapper = styled.ScrollView`
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer}px;
    overflow: visible;
`;

PickerWrapper.defaultProps = {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
};

export const PickingItem = styled.Pressable<{ selected?: boolean }>`
    height: 90%;
    border-width: 2px;
    border-radius: ${(props) => props.theme.spacer}px;
    border-color: ${(props) => props.theme.colors.contrast};
    opacity: ${(props) => (props.selected ? 1 : 0.3)};
    margin-right: ${(props) => props.theme.spacer * 2}px;
`;

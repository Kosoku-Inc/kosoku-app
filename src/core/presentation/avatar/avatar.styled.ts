import styled from 'styled-components/native';

export const Avatar = styled.Image`
    height: 80px;
    width: 80px;
    border-radius: 40px;
`;

Avatar.defaultProps = {
    resizeMode: 'cover',
};

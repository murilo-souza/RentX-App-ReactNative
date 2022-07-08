import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from'styled-components/native';
import theme from '../../styles/theme';

export const Container = styled(RectButton)`
    width: 80px;
    height: 56px;

    background-color: ${theme.colors.shape_dark};

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${theme.fonts.primary_500};
    color: ${theme.colors.shape};
    font-size: ${RFValue(15)}px;

`;
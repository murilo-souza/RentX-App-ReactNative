import { RFValue } from 'react-native-responsive-fontsize';
import styled from'styled-components/native';
import theme from '../../styles/theme';

export const Container = styled.View`
    width: 109px;
    height: 92px;

    align-items: center;
    justify-content: center;

    background-color: ${theme.colors.background_primary};

    padding: 16px;
    margin-bottom: 8px;
`;

export const Name = styled.Text`
    font-family: ${theme.fonts.primary_500};
    color: ${theme.colors.text};
    font-size: ${RFValue(12)}px;
`;
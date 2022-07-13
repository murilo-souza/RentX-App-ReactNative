import styled from'styled-components/native';
import theme from '../../styles/theme';
import {RFValue} from 'react-native-responsive-fontsize'
import { FlatList, FlatListProps } from 'react-native';
import { CarDTO} from '../../dtos/CarDTO'
import { Car } from '../../databases/model/Car';


export const Container = styled.View`
   flex:1;
   background-color: ${theme.colors.background_primary};

`;

export const Header = styled.View`
   width: 100%;
   height: 113px;

   background-color: ${theme.colors.header};

    
   justify-content: flex-end;
   padding: 32px 24px;
`;

export const HeaderContent = styled.View`
   justify-content: space-between;
   align-items: center;
   flex-direction: row;
`;

export const TotalCars = styled.Text`
   font-size: ${RFValue(13)}px;

   font-family: ${theme.fonts.primary_400};
   color: ${theme.colors.text};

`;

export const CarList = styled(FlatList as new (props: FlatListProps<Car>) => FlatList<Car> ).attrs({
   contentContainerStyle: {
      padding: 24
   },
   showsVerticalScrollIndicator: false,
})``;


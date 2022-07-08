import React from'react'
import {MaterialIcons} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import{
    Container,
}from'./styles';
import { useNavigation } from '@react-navigation/native';

interface Props extends BorderlessButtonProps{
    color?: string;
}

type NavigationProps = {
    navigate: (screen: string)=> void;
}

export function BackButton({color, ...rest}: Props){
    const theme = useTheme();
    const navigation = useNavigation()

    function handleGoBack(){
        navigation.goBack()
    }

    return (
        <Container {...rest}>
            <MaterialIcons
                name="chevron-left"
                size={24}
                color={color ? color : theme.colors.text}
            />
        </Container>
    );
}
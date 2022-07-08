import React from'react'
import { StatusBar, useWindowDimensions } from 'react-native';
import{
    Container,
    Content,
    Title,
    Message,
    Footer
}from'./styles';

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation, useRoute } from '@react-navigation/native';

type NavigationProps = {
    navigate: (screen: string)=> void;
}

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;

}

export function Confirmation(){
    const {width} = useWindowDimensions()
    const route = useRoute()
    const {title, message, nextScreenRoute} = route.params as Params;
    const navigation = useNavigation<NavigationProps>()
    function handleConfirm(){
        navigation.navigate(nextScreenRoute)
    }
    return (
        <Container>
            <StatusBar barStyle='light-content' backgroundColor="transparent" translucent/>
            <LogoSvg width={width}/>
            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>{title}</Title>

                <Message>
                    {message}
                </Message>
            </Content>
            <Footer>
                <ConfirmButton title='OK' onPress={handleConfirm}/>
            </Footer>
        </Container>
    );
}
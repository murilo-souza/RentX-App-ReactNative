import React, { useEffect, useState } from'react'
import { Alert, StatusBar } from 'react-native';
import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import {format} from 'date-fns'

import {getAccessoryIcon} from '../../utils/getAccessoryIcon'

import{
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
    Footer,
}from'./styles';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import {Feather} from '@expo/vector-icons'
import { getPlatformDate } from '../../utils/getPlataformDate';
import { api } from '../../services/api';

type NavigationProps = {
    navigate: (screen: string, {})=> void;
    goBack: () => void;
}
interface Params {
    car: CarDTO
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetail(){
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const [loading, setLoading] = useState(false)
    const theme = useTheme()
    const navigation = useNavigation<NavigationProps>()
    const route = useRoute()
    const {car, dates} = route.params as Params
    const rentalTotal = Number(dates.length * car.rent.price)
    
    async function handleConfirmRental(){
        setLoading(true)
        const schedulesBycar = await api.get(`/schedules_bycars/${car.id}`)

        const unavailable_dates = [
            ...schedulesBycar.data.unavailable_dates,
            ...dates,
        ]

        await api.post('/schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })

        api.put(`/schedules_bycars/${car.id}`,{
            id: car.id,
            unavailable_dates
        }).then(() => {
            navigation.navigate('Confirmation', {
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
                nextScreenRoute: 'Home',
            })
        })
        .catch(()=> {
            Alert.alert('Não foi possivel confirmar o agendamento')
            setLoading(false)
        })

        
    }

    function handleBack(){
        navigation.goBack()
    }

    useEffect(()=>{
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })
    },[])

    return (
        <Container>
            <StatusBar barStyle='dark-content' backgroundColor="transparent" translucent/>
            <Header>
                <BackButton onPress={handleBack}/>
            </Header>
            <CarImages>
                <ImageSlider imageUrl={car.photos}/>
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>{`R$ ${car.rent.price}`}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {
                        car.accessories.map(acessory => (
                            <Acessory
                                key={acessory.type}
                                name={acessory.name}
                                icon={getAccessoryIcon(acessory.type)}
                            />
                        ))
                    }
                </Accessories>
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name='calendar'
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                    <Feather
                        name='chevron-right'
                        size={RFValue(15)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>
                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>{`R$ ${rentalTotal}`}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>
            <Footer>
                <Button 
                    onPress={handleConfirmRental} 
                    title="Alugar agora" 
                    color={theme.colors.success}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}
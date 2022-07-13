import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from'react'
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { api } from '../../services/api';
import {AntDesign} from '@expo/vector-icons'
import{
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
}from'./styles';
import { LoadAnimation } from '../../components/LoadAnimation';
import {Car as ModelCar} from '../../databases/model/Car'
import { format, parseISO } from 'date-fns';


interface DataProps{
    id: string
    car: ModelCar
    start_date: string
    end_date: string
}

export function MyCars(){
    const [cars, setCars] = useState<DataProps[]>([])
    const [loading, setLoading] = useState(true)
    const screenIsFocus = useIsFocused()
    const navigation = useNavigation()
    const theme = useTheme()

    useEffect(()=>{
        async function fetchCars(){
            try{
                const response = await api.get('/rentals')
                const dataFormatted = response.data.map((data: DataProps)=>{
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
                    }
                })
                setCars(dataFormatted)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }
        fetchCars()

    }, [screenIsFocus])
    function handleBack(){
        navigation.goBack()
    }
    return (
        <Container>
            <StatusBar barStyle='light-content' backgroundColor="transparent" translucent/>
            <Header>
                <BackButton onPress={handleBack} color={theme.colors.background_secondary}/>
                <Title>
                    Escolha uma{'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>
                <SubTitle>
                    Conforto, segurança e praticidade
                </SubTitle>
            </Header>
            {
                loading ? <LoadAnimation/> : 
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>
                    <FlatList
                        data={cars}
                        keyExtractor={item=> item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=>(
                            <CarWrapper>
                                <Car  data={item.car}/>
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.start_date}</CarFooterDate>
                                        <AntDesign
                                            name='arrowright'
                                            size={20}
                                            color={theme.colors.title}
                                            style={{marginHorizontal:10}}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                </Content>
            }
        </Container>
    );
}
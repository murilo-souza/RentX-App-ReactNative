import React, {useEffect, useState} from 'react'
import { StatusBar, StyleSheet, BackHandler} from 'react-native';
import{
   CarList,
    Container,
    Header,
    HeaderContent,
    TotalCars,
}from'./styles';

import {RFValue} from 'react-native-responsive-fontsize'



import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { CarDTO} from '../../dtos/CarDTO'
import { LoadAnimation } from '../../components/LoadAnimation';

type NavigationProps = {
   navigate: (screen: string, car?: {} )=> void;
}


export function Home(){
   const [cars, setCars] = useState<CarDTO[]>([])
   const [loading, setLoading] = useState(true)
   const navigation = useNavigation<NavigationProps>()

   
   function handleCarDetails(car: CarDTO){
      navigation.navigate('CarDetails', {car})
   }


   useEffect(()=>{
      async function fetchCars(){
         try{
            const response = await api.get('/cars')
            setCars(response.data)
         }catch(err){
            console.log(err)
         }finally{
            setLoading(false)
         }

      }

      fetchCars()
   }, [])


   return (
      <Container>
         <StatusBar barStyle='light-content' backgroundColor="transparent" translucent/>
         <Header>
            <HeaderContent>
               <Logo
                  width={RFValue(108)}
                  height={RFValue(12)}
                  />
               {
                  !loading &&
                  <TotalCars>
                     Total de {cars.length} carros
                  </TotalCars>
               }
            </HeaderContent>
         </Header>
         {
         loading ? <LoadAnimation/> :
            <CarList 
               data={cars}
               keyExtractor={item => item.id}
               renderItem={({item})=><Car data={item} onPress= {() => handleCarDetails(item)}/>}
            />
         }
      </Container>
   );
}
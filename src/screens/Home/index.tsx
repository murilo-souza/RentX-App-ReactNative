import React, {useEffect, useState} from 'react'
import { StatusBar} from 'react-native';
import{
   CarList,
    Container,
    Header,
    HeaderContent,
    TotalCars,
}from'./styles';

import {RFValue} from 'react-native-responsive-fontsize'

import {synchronize} from '@nozbe/watermelondb/sync'
import { database } from '../../databases';
import { Car as ModelCar } from '../../databases/model/Car';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { CarDTO} from '../../dtos/CarDTO'
import { LoadAnimation } from '../../components/LoadAnimation';
import { useNetInfo } from '@react-native-community/netinfo';
import { Button } from '../../components/Button';

type NavigationProps = {
   navigate: (screen: string, car?: {} )=> void;
}


export function Home(){
   const [cars, setCars] = useState<ModelCar[]>([])
   const [loading, setLoading] = useState(true)

   const netInfo = useNetInfo()
   const navigation = useNavigation<NavigationProps>()

   
   function handleCarDetails(car: CarDTO){
      navigation.navigate('CarDetails', {car})
   }

   async function offlineSynchronize(){
      await synchronize({
         database,

         pullChanges: async ({lastPulledAt}) => {
            const response = await api
            .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
            const {changes, latestVersion} = response.data
            return {changes, timestamp: latestVersion};

         },
         pushChanges: async ({changes}) => {
            const user = changes.users;
            await api.post('/users/sync', user)
         }

      })
   }

   useEffect(()=>{
      let isMonted = true;

      async function fetchCars(){
         try{
            const carCollection = database.get<ModelCar>('cars');
            const cars = await carCollection.query().fetch();

             if(isMonted){
               setCars(cars)
            }
         }catch(err){
            console.log(err)
         }finally{
            if(isMonted){
               setLoading(false)
            }
         }

      }
      fetchCars();
      return () => {
         isMonted = false
      }

   }, [])

   useEffect(()=>{
      if(netInfo.isConnected === true){
         offlineSynchronize()
      }
   },[netInfo.isConnected])

   
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
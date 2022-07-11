import React from "react";

import { createStackNavigator} from '@react-navigation/stack'

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetail } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from "../screens/MyCars";


const {Navigator, Screen} = createStackNavigator();

export function AppStackRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false
            
        }} >
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="CarDetails"
                component={CarDetails}
            />
            <Screen 
                name="Scheduling"
                component={Scheduling}
            />
            <Screen 
                name="SchedulingDetails"
                component={SchedulingDetail}
            />
            <Screen 
                name="Confirmation"
                component={Confirmation}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    )
}
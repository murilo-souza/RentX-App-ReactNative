import React from "react";

import { createStackNavigator} from '@react-navigation/stack'

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetail } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirtsStep } from "../screens/SignUp/SignUpFirtsStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";


const {Navigator, Screen} = createStackNavigator();

export function AppStackRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false
            
        }} initialRouteName='Splash'>
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
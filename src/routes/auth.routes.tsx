import React from "react";

import { createStackNavigator} from '@react-navigation/stack'
import { Confirmation } from '../screens/Confirmation';
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirtsStep } from "../screens/SignUp/SignUpFirtsStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";


const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false
            
        }} initialRouteName='Splash'>
            <Screen 
                name="Splash"
                component={Splash}
            />
            <Screen 
                name="SignIn"
                component={SignIn}
            />
            <Screen 
                name="SignUpFirtsStep"
                component={SignUpFirtsStep}
            />
            <Screen 
                name="SignUpSecondStep"
                component={SignUpSecondStep}
            />
            <Screen 
                name="Confirmation"
                component={Confirmation}
            />
        </Navigator>
    )
}
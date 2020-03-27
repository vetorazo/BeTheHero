import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import Incidents from './pages/Incidents'
import Detail from './pages/Detail'

const AppStack = createStackNavigator();

//created two pages (Incident and Detail) within NavigationContainer, each page is shown with AppStack.Screen
export default function Routes() {

    //headerShown is false because I will not use the default header but a header made by me
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false}} >
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
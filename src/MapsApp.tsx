import './gesture-handler.native';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { PermissionChecker } from './presentation/providers/PermissionChecker';


export const MapsApp = () => {
    return (
        <NavigationContainer>
            <PermissionChecker>
                <StackNavigator />
            </PermissionChecker>
        </NavigationContainer>
    );
};

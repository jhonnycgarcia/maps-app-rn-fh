import { PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';
import { userPermissionStore } from '../store/permissions/usePermissionStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';

export const PermissionChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = userPermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        if(locationStatus === 'granted') {
            navigation.navigate('MapScreen');
        } else if(locationStatus !== 'undetermined') {
            navigation.navigate('PermissionsScreen');
        }
    }, [locationStatus]);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextState) => {
            if(nextState === 'active') {
                checkLocationPermission();
            }
        });

        return () => subscription.remove();
    }, []);


    return (
        <>{children}</>
    );
};

import { PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';
import { userPermissionStore } from '../store/permissions/usePermissionStore';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

export const PermissionChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = userPermissionStore();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    useEffect(() => {
        if(locationStatus === 'granted') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'MapScreen' }],
            });
        } else if(locationStatus !== 'undetermined') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'PermissionsScreen' }],
            });
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

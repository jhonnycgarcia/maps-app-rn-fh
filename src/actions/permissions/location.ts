import { openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionStatus } from 'react-native-permissions';
import type { PermissionStatus } from '../../infrastructure/interfaces/permission';
import { Platform } from 'react-native';

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
        throw new Error('Unsupported platform');
    }

    // si el usuario bloquea la ubicación, se le pide que vaya a la configuración
    // para activarla
    if(status === 'blocked') {
        await openSettings();
        //TODO: return await checkLocationPermission();
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        limited: 'limited',
        unavailable: 'unavailable',
    };

    return permissionMapper[status] ?? 'unavailable';
};

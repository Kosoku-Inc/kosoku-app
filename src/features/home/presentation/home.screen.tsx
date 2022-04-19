import BottomSheet from '@gorhom/bottom-sheet';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback, useMemo } from 'react';
import { Keyboard, View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import mapStyle from '../../../../assets/maps/style.json';
import { getIsDriver } from '../../../core/data/store/user.selectors';
import { Background } from '../../../core/presentation/background/background.styled';
import {
    getIsCarSearching,
    getIsChoosingRoute,
    getIsDriverIdle,
    getIsUserOnRide,
    getIsDriverRequested,
    getIsRidePreparing,
    getPrepareRideFromLocation,
    getPrepareRideToLocation,
    getRideRequest,
} from '../data/store/home.selectors';
import { useMapSetup } from '../utils/hooks/use-map-setup.utils';
import { bottomSheetService } from '../utils/services/bottom-sheet-service.utils';
import { mapService } from '../utils/services/map-service.utils';

import { burgerAsset, BurgerMenu, BurgerWrapper } from './components/burger-menu/burger-menu.styled';
import { ChooseClass } from './components/choose-class/choose-class.component';
import { CustomerRideStatus } from './components/customer-ride-status/customer-ride-status.component';
import { DriverIdleStatus } from './components/driver-status/driver-idle-status.component';
import { DriverOnRideStatus } from './components/driver-status/driver-on-ride-status.component';
import { Pointer } from './components/pointer/pointer.component';
import { RideRequest } from './components/ride-request/ride-request.component';
import { SearchBlock } from './components/search-block/search-block.component';
import { Status } from './components/status/status.component';
import { StatusWrapper } from './components/status/status.styled';

export const HomeScreen = ({ navigation }: { navigation: DrawerNavigationProp<never> }) => {
    const insets = useSafeAreaInsets();
    const rideRequest = useSelector(getRideRequest);
    const animatedSheetPosition = useSharedValue(0);

    const isPreparing = useSelector(getIsRidePreparing);
    const isChoosingRoute = useSelector(getIsChoosingRoute);
    const isDriver = useSelector(getIsDriver);
    const isCarSearching = useSelector(getIsCarSearching);
    const isDriverIdle = useSelector(getIsDriverIdle);
    const isDriverRequested = useSelector(getIsDriverRequested);
    const isUserOnRide = useSelector(getIsUserOnRide);

    const to = useSelector(getPrepareRideToLocation);
    const from = useSelector(getPrepareRideFromLocation);

    const isDraggable = useMemo(
        () => (!isDriver && !isCarSearching && !isPreparing) || (!rideRequest && isDriver),
        [isDriver, isCarSearching, rideRequest, isPreparing]
    );

    const onBottomSheetAnimate = useCallback((fromIndex: number, toIndex: number) => {
        if (fromIndex === 1 && toIndex === 0) {
            Keyboard.dismiss();
        }
    }, []);

    const { onRegionChange, onRegionChangeComplete, pointerRef, snapPoints } = useMapSetup();

    return (
        <Background disableMargins={true}>
            <MapView
                ref={mapService.getMapRef()}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                customMapStyle={mapStyle}
                showsUserLocation={isDriver}
                onRegionChange={!isDriver && isChoosingRoute ? onRegionChange : undefined}
                scrollEnabled={isDraggable}
                zoomEnabled={isDraggable}
                pitchEnabled={isDraggable}
                rotateEnabled={false}
                onRegionChangeComplete={!isDriver && isChoosingRoute ? onRegionChangeComplete : undefined}
            >
                {isPreparing && !!from && !!to && (
                    <>
                        <Marker coordinate={from} />
                        <Marker coordinate={to} />
                    </>
                )}
            </MapView>
            {/* eslint-disable-next-line react-native/no-color-literals */}
            {isCarSearching && (
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' }} />
            )}
            {!isDriver && isChoosingRoute && <Pointer ref={pointerRef} />}
            {isDriver && !!rideRequest && <Pointer />}
            <StatusWrapper style={{ top: insets.top }}>
                <Status />
            </StatusWrapper>
            <BurgerWrapper onPress={navigation.openDrawer}>
                <BurgerMenu source={burgerAsset} style={{ top: insets.top }} />
            </BurgerWrapper>
            <BottomSheet
                animatedPosition={animatedSheetPosition}
                onAnimate={onBottomSheetAnimate}
                snapPoints={snapPoints}
                index={0}
                ref={bottomSheetService.setRef}
            >
                {isDriver ? (
                    <>
                        {isDriverIdle && <DriverIdleStatus />}
                        {isDriverRequested && <RideRequest />}
                        {isUserOnRide && <DriverOnRideStatus />}
                    </>
                ) : (
                    <>
                        {isChoosingRoute && <SearchBlock animatedSheetPosition={animatedSheetPosition} />}
                        {isPreparing && <ChooseClass />}
                        {isUserOnRide && <CustomerRideStatus />}
                    </>
                )}
            </BottomSheet>
        </Background>
    );
};

// <TextInput placeholder={'Куда едем?'} onFocus={() => bottomSheetService.expand()} />
// <Button isLoading={isCarSearching} title={'Начать поездку'} onPress={onGoPress} />

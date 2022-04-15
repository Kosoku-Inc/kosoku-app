import BottomSheet from '@gorhom/bottom-sheet';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import mapStyle from '../../../../assets/maps/style.json';
import { getExistingUser } from '../../../core/data/store/user.selectors';
import { Background } from '../../../core/presentation/background/background.styled';
import { TextInput } from '../../../core/presentation/text-input/text-input.component';
import { useMapSetup } from '../utils/hooks/use-map-setup.utils';
import { bottomSheetService } from '../utils/services/bottom-sheet-service.utils';
import { mapService } from '../utils/services/map-service.utils';

import { burgerAsset, BurgerMenu, BurgerWrapper } from './components/burger-menu/burger-menu.styled';
import { Pointer } from './components/pointer/pointer.component';
import { Status } from './components/status/status.component';
import { StatusWrapper } from './components/status/status.styled';

export const HomeScreen = ({ navigation }: { navigation: DrawerNavigationProp<never> }) => {
    const insets = useSafeAreaInsets();
    const user = useSelector(getExistingUser);

    const { onRegionChange, onRegionChangeComplete, pointerRef } = useMapSetup();

    return (
        <Background disableMargins={true}>
            <MapView
                ref={mapService.getMapRef()}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                customMapStyle={mapStyle}
                onRegionChange={onRegionChange}
                onRegionChangeComplete={onRegionChangeComplete}
            />
            <Pointer ref={pointerRef} />
            <StatusWrapper style={{ top: insets.top }}>
                <Status />
            </StatusWrapper>
            <BurgerWrapper onPress={navigation.openDrawer}>
                <BurgerMenu source={burgerAsset} style={{ top: insets.top }} />
            </BurgerWrapper>
            {!!user && !user.driver && (
                <BottomSheet snapPoints={['15%', '88%']} index={0} ref={bottomSheetService.setRef}>
                    <TextInput placeholder={'Куда едем?'} onFocus={() => bottomSheetService.expand()} />
                </BottomSheet>
            )}
        </Background>
    );
};

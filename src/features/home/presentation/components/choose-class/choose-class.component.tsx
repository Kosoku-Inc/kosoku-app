import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CarClass } from '../../../../../core/model/car-class.model';
import { Button } from '../../../../../core/presentation/button/button.component';
import { DefaultCard } from '../../../../../core/presentation/horizontal-picker/default-card.component';
import { HorizontalPicker } from '../../../../../core/presentation/horizontal-picker/horizontal-picker.component';
import { Spacer } from '../../../../../core/presentation/spacer/spacer.styled';
import { toCarClassAsset, toReadableCarClass } from '../../../../../core/utils/formatters/car-class.utils';
import { colors } from '../../../../../core/utils/theme/colors.utils';
import { defaultShadow } from '../../../../../core/utils/theme/shadows.utils';
import { defaultTheme } from '../../../../../core/utils/theme/themes.utils';
import { CHOOSE_ROUTE, DECLINE_RIDE_REQUEST, REQUEST_RIDE } from '../../../data/store/home.actions';
import { getIsCarSearching, getIsPrepareRideRequestLoading, getRideRequest } from '../../../data/store/home.selectors';

import { ChooseClassButtonsWrapper, ChooseClassWrapper } from './choose-class.styled';

export const ChooseClass: React.FC = () => {
    const dispatch = useDispatch();
    const isRideRequestLoading = useSelector(getIsPrepareRideRequestLoading);
    const rideRequest = useSelector(getRideRequest);
    const isCarSearching = useSelector(getIsCarSearching);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);

    const handleCancel = useCallback(() => {
        if (isCarSearching) {
            dispatch(DECLINE_RIDE_REQUEST.TRIGGER());
        } else {
            dispatch(CHOOSE_ROUTE.TRIGGER());
        }
    }, [dispatch, isCarSearching]);

    const handleGoPress = useCallback(() => {
        if (!rideRequest || selectedClass === null) return;

        const carClass = Object.keys(rideRequest.classes)[selectedClass] as CarClass;
        const cost = Object.values(rideRequest.classes)[selectedClass];

        dispatch(REQUEST_RIDE.TRIGGER({ carClass, cost }));
    }, [dispatch, rideRequest, selectedClass]);

    return (
        <ChooseClassWrapper>
            {rideRequest ? (
                <HorizontalPicker
                    content={Object.keys(rideRequest.classes).map((clazz) => (
                        <DefaultCard
                            key={clazz}
                            title={`${toReadableCarClass(clazz as CarClass)} - ${
                                rideRequest.classes[clazz as CarClass]
                            }p`}
                            style={{ width: 150, opacity: isCarSearching ? 0.5 : 1 }}
                            asset={toCarClassAsset(clazz as CarClass)}
                        />
                    ))}
                    disabled={isCarSearching}
                    onSelectionChange={setSelectedClass}
                />
            ) : (
                <Spacer />
            )}
            <ChooseClassButtonsWrapper>
                <Button
                    title={'Отмена'}
                    onPress={handleCancel}
                    style={{
                        flex: 1,
                        marginRight: defaultTheme.spacer,
                        backgroundColor: colors.white,
                        ...defaultShadow,
                    }}
                    textStyle={{
                        color: defaultTheme.colors.text,
                    }}
                />
                <Button
                    title={'Поехали!'}
                    onPress={handleGoPress}
                    isLoading={isRideRequestLoading || isCarSearching}
                    disabled={selectedClass === null}
                    style={{
                        flex: 1,
                        marginLeft: defaultTheme.spacer,
                        ...defaultShadow,
                        opacity: selectedClass === null ? 0.5 : 1,
                    }}
                />
            </ChooseClassButtonsWrapper>
        </ChooseClassWrapper>
    );
};

//<HorizontalPicker content={} onSelectionChange={console.log}/>

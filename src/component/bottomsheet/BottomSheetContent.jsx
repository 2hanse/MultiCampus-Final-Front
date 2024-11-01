import React, { useEffect, useRef } from 'react';
import { Text, Modal, Animated, TouchableWithoutFeedback, Dimensions, PanResponder } from 'react-native';
import styled from 'styled-components/native';

const BottomSheetContent = (props) => {
    const { modalVisible, setModalVisible } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    
    const translateY = panY.interpolate({
        inputRange: [-1, 0, screenHeight],
        outputRange: [0, 0, screenHeight],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            } else {
                resetBottomSheet.start();
            }
        },
    })).current;

    useEffect(() => {
        if (modalVisible) {
            resetBottomSheet.start();
        }
    }, [modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setModalVisible(false);
        });
    };

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <Overlay>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <Background />
                </TouchableWithoutFeedback>
                <BottomSheetContainer
                    style={{ transform: [{ translateY: translateY }] }}
                    {...panResponders.panHandlers}
                >
                    <Text>This is BottomSheet</Text>
                </BottomSheetContainer>
            </Overlay>
        </Modal>
    );
};

const Overlay = styled.View`
    flex: 1;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Background = styled.View`
    flex: 1;
`;

const BottomSheetContainer = styled(Animated.View)`
    height: 300px;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export default BottomSheetContent;
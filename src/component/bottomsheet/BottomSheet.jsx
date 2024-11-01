import React, { useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import BottomSheetContent from './BottomSheetContent';

const BottomSheet = (props) => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const pressButton = () => {
        setModalVisible(true);
    }

    return (
        <Container>
            <Button
                title={"Open BottomSheet!"}
                onPress={pressButton}
            />
            <BottomSheetContent
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default BottomSheet;
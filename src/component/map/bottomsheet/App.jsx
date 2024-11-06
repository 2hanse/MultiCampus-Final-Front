import React, { useState, useEffect } from 'react';
import Header from '../Header';
import BottomSheet from './BottomSheet';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    // Bottom Sheet를 열기 위한 함수
    const openBottomSheet = () => {
        setIsOpen(true);
        console.log("Bottom Sheet Opened");
    };

    const closeBottomSheet = () => {
        setIsOpen(false);
        console.log("Bottom Sheet Closed");
    };

    useEffect(() => {
        console.log("isOpen 상태 변화:", isOpen);
    }, [isOpen]); // isOpen이 변경될 때마다 로그 출력
  
    return (
      <div>
        {/* openBottomSheet를 props로 전달 */}
        <Header openBottomSheet={openBottomSheet} />
  
        {/* isOpen 상태에 따라 BottomSheet 렌더링 */}
        {isOpen && <BottomSheet onClose={closeBottomSheet} />}
      </div>
    );
  };
  
  export default App;
import { useRef, useEffect, useState } from "react";

export const MIN_Y = 60; // 바텀시트가 최대로 올라갔을 때의 Y값
export const MAX_Y = window.innerHeight - 60; // 여백 설정, 바텀시트가 최대로 내려갔을 때의 Y값
export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y;

export default function useBottomSheet() {

    const sheet = useRef(null);
    const content = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const metrics = useRef({
        touchStart: {
            sheetY: 0,
            touchY: 0
        },
        touchMove: {
            prevTouchY: 0,
            movingDirection: "none"
        },
        isContentAreaTouched: false
    });

    useEffect(() => {
        const canUserMoveBottomSheet = (e) => {
            const {touchMove, isContentAreaTouched } = metrics.current;

            if(!isContentAreaTouched) {
                return true;
            }

            if(sheet.current && sheet.current.getBoundingClientRect().y !== MIN_Y) {
                return true;
            }
            // 더이상 스크롤 할 것이 없다면, 바텀시트를 움직임

            if( touchMove.movingDirection === "down" && content.current.scrollTop <= 10) {
                sheet.current.style.setProperty("transform", "translateY(0)");
                sheet.current.style.setProperty("top", "382px");
                setIsOpen(false);
            }

            return false;
        };

        const handleTouchStart = (e) => {
            if(sheet.current) {
                const { touchStart } = metrics.current;
                touchStart.sheetY = sheet.current.getBoundingClientRect().y;
                touchStart.touchY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            const { touchStart, touchMove } = metrics.current;
            const currentTouch = e.touches[0];

            if(touchMove.prevTouchY === undefined) {
                touchMove.prevTouchY = touchStart.touchY;
            }

            if(touchMove.prevTouchY === 0) {
                touchMove.prevTouchY = touchStart.touchY;
            }

            if(touchMove.prevTouchY < currentTouch.clientY) {
                touchMove.movingDirection = "down";
            }

            if(touchMove.prevTouchY > currentTouch.clientY) {
                touchMove.movingDirection = "up";
            }

            if(canUserMoveBottomSheet(e)) {
                e.preventDefault();

                const touchOffset = currentTouch.clientY - touchStart.touchY;
                let nextSheetY = touchStart.sheetY + touchOffset;

                if(nextSheetY <= MIN_Y) {
                    nextSheetY = MIN_Y;
                }

                if(nextSheetY >= MAX_Y) {
                    nextSheetY = MAX_Y;
                }

                if(sheet.current) {
                    sheet.current.style.setProperty("transform", `translateY(0px)`);
                    // sheet.current.style.setProperty("top", "382px");
                }
            } else {
                // document.body.style.overflowY = "hidden";
            }
        };

        const  handleTouchEnd = () => {
            // document.body.style.overflowY = "auto";
            const { touchMove } = metrics.current;

            if(sheet.current) {
                const currentSheetY = sheet.current.getBoundingClientRect().y;

                if(currentSheetY !== MIN_Y) {
                    if(touchMove.movingDirection === "down") {
                        sheet.current.style.setProperty("top", "382px");
                        setIsOpen(false);
                    }

                    if(touchMove.movingDirection === "up") {
                        sheet.current.style.setProperty("top", `${MIN_Y}px`);
                        // sheet.current.style.setProperty("transform", `translateY(-330px)`);
                        // sheet.current.style.setProperty("transform", `translateY(${MIN_Y - MAX_Y}px)`);
                        setIsOpen(true);
                    }
                }
            }

            metrics.current = {
                touchStart: {
                    sheetY: 0,
                    touchY: 0
                },
                touchMove: {
                    prevTouchY: 0,
                    movingDirection: "none"
                },
                isContentAreaTouched:false
            };
        };

        const sheetElement = sheet.current;
        sheetElement?.addEventListener("touchstart", handleTouchStart);
        sheetElement?.addEventListener("touchmove", handleTouchMove);
        sheetElement?.addEventListener("touchend", handleTouchEnd);

        return () => {
            sheetElement?.removeEventListener("touchstart", handleTouchStart);
            sheetElement?.removeEventListener("touchmove", handleTouchMove);
            sheetElement?.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    useEffect(() => {
        const handleTouchStart = () => {
            metrics.current.isContentAreaTouched = true;
        };

        const handleTouchEnd = () => {
            metrics.current.isContentAreaTouched = false;
        };

        content.current?.addEventListener("touchstart", handleTouchStart);

        return () => {
            content.current.removeEventListener("touchstart", handleTouchStart);
        };
    }, []);

    return { sheet, content, isOpen, setIsOpen };
}
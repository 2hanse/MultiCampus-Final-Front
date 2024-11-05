import React from "react";
import styled from "styled-components";

const CreateBookmark = () => {

}

const CustomSheet = styled(Sheet)`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    margin-bottom: 102px;
    max-width: 430px;
    z-index: 5;

    /* sheet 라이브러리 css 덮어 쓰려면 !important 끝에 들어가야합니다 */
    .react-modal-sheet-backdrop {
        position: absolute !important;
        width: 430px !important;
        margin-bottom: 100px !important;
        background-color: rgba(0, 0, 0, 0.1) !important;
    }
    .react-modal-sheet-container {
        background-color: #FFFFFF !important;
        border-radius: 20px 20px 0px 0px !important;
        padding-top: 10px !important;
    }
    .react-modal-sheet-header {
        /* custom styles */
    }
    .react-modal-sheet-drag-indicator {
        background: #999 !important;
        border-radius: 5px !important;
        cursor: grab;
    }
    .react-modal-sheet-content {
        margin: 10px 20px !important;
    }
`;

export default CreateBookmark;
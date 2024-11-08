import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

const Editor = ({ title, setTitle, content, setContent, uploadPlugin }) => {
  return (
    <div className="Editor">
      <TitleWrapper>
        <h3>제목</h3>
        <InputTitle
          className="input-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요..."
        />
      </TitleWrapper>

      <CKEditor
        editor={ClassicEditor}
        data={content}
        onReady={(editor) => {
          uploadPlugin(editor);
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
          console.log({ event, editor, content });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

const TitleWrapper = styled.div`
  padding: 17px;
  display: flex;
  align-items: center; /* 수직 정렬 */
  gap: 13px; /* 제목과 textarea 사이의 간격 */
`;

const InputTitle = styled.textarea`
  flex: 1; /* 텍스트 영역이 가능한 공간을 모두 차지하게 함 */
  border: 1px solid #49454f; /* 테두리 색상 설정 */
  border-radius: 5px; /* 테두리 둥글게 */
  padding: 15px 10px; /* 위쪽 padding을 늘려서 중앙 정렬 효과 */
  resize: none; /* 크기 조절 비활성화 */
  line-height: 18px; /* 줄 높이를 텍스트 높이와 맞춤 */
  height: 18px; /* 원하는 높이 설정 (예: 50px) */
  font-size: 13px; /* 텍스트 크기 조정 */
`;

export default Editor;

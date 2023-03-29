import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export default function NoteTaking() {
  const user = useSelector((state: RootState) => state.users);
  const lesson = useSelector((state: RootState) => state.lesson);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <form >
        <Editor
          apiKey='qhrccluh9egw2xnki7jb7iggq6y8w4kx4g8g8puqu42q3s7r'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            width: 800,
            menubar: true,
            selector: 'textarea',
            plugins: ['save',
              ' advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount ',

            ],
            toolbar: 'save' + '  undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help save',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            save_onsavecallback:  () => {
              return fetch('https://classzoom.cyclic.app/noteBook', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  note: editorRef.current.getContent(),
                  // note: 'tttttteeeessstttt',
                  // userId: 'auth0|642330ea936cc041cfc337cb',
                  userId: user.id,
                  
                  lessonId: '7327d170-ff5c-465f-831f-dff9b12a5d02',
                  // lessonId: lesson.id,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log('Success:', data);
                  return data;
                })
                .catch((error) => {
                  console.log(error);
                  console.error({ 'Error': error });
                });
            } 
          }}
        />
      </form>
    </>
  );
}
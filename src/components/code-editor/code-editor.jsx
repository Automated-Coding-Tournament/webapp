import React, { useEffect, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { material } from '@uiw/codemirror-theme-material';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';

const extensions = [python(), java()];

const CodeEditor = ({ value, onChange, height, width }) => {
  const editor = useRef();

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: material,
    height: height || 'auto',
    width: width || 'auto',
    value: value,
    onChange: onChange
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return <div ref={editor} />;
};

export default CodeEditor;

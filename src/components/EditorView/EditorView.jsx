import React, { useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { editor } from 'monaco-editor';
import { updateFile } from '../../context/actions/globalActions';

const Editor = () => {
  let [{ file }, dispatchToGlobal] = useContext(GlobalContext);
  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 70,
    autoIndent: true,
    colorDecorators: true,
    wrappingIndent: 'indent',
    automaticLayout: true,
  };

  const editorDidMount = () => {
    editor.setTheme('light-dark');
  };

  let value = null;
  const updatafile = (newValue, e) => {
    value = newValue;
  };

  return (
    <div>
      <button
        onClick={() => {
          dispatchToGlobal(updateFile(value));
        }}
      >
        {' '}
        save the updates
      </button>
      <MonacoEditor
        height='95vh'
        language='javascript'
        theme='light-dark'
        value={file ? file : '// Open a file or click preview to view your code.'}
        options={options}
        editorDidMount={editorDidMount}
        onChange={updatafile}
      />
    </div>
  );
};

export default Editor;

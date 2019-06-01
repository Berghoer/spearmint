import React, { useState, useContext } from 'react';
import RenderProp from './RenderProp';
import { ComponentNameContext, FilePathContext } from '../../../App';
import { deleteRender, updateRender, addRenderProp } from '../../../context/testCaseActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Render = ({ id, dispatchTestCase, props, reRender }) => {
  const [toggleProps, setToggleProps] = useState(false);
  const [componentName, setComponentName] = useContext(ComponentNameContext);
  const [filePath, setFilePath] = useContext(FilePathContext);

  const handleClickDelete = e => {
    dispatchTestCase(deleteRender(id));
  };

  const handleChange = e => {
    setComponentName(e.target.value);
    if (filePath) {
      dispatchTestCase(updateRender(id, e.target.value, filePath));
      setFilePath(null);
    }
  };

  const handleToggleProps = () => {
    setToggleProps(!toggleProps);
    dispatchTestCase(addRenderProp(id));
  };

  const propsJSX = props.map(prop => {
    return (
      <RenderProp
        key={id}
        renderId={id}
        propId={prop.id}
        propKey={prop.propKey}
        propValue={prop.propValue}
      />
    );
  });
  return (
    <section>
      <h3>{!reRender ? 'Render' : 'Rerender'}</h3>
      <FontAwesomeIcon id='delete-action' icon='times' onClick={handleClickDelete} />
      <div>
        <label htmlFor='render-input-box'>Component Name</label>
        <input type='text' id='render-input-box' value={componentName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor='render-checkbox'>Props</label>
        <input
          type='checkbox'
          id='render-checkbox'
          disabled={propsJSX.length}
          onClick={handleToggleProps}
        />
      </div>
      {toggleProps && propsJSX}
    </section>
  );
};

export default Render;

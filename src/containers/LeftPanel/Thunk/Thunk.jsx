import React, { useContext } from 'react';
import styles from '../Thunk/Thunk.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import {
  deleteAsync,
  updateAsync,
  updateActionsFilePath,
  updateTypesFilePath,
} from '../../../context/reduxTestCaseActions';
import ToolTipAsync from '../ToolTip/ToolTipAsync';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');
const questionIcon = require('../../../assets/images/help-circle.png');

const Async = ({ async, index, dispatchToReduxTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);

  const handleChangeAsyncFields = (e, field) => {
    let updatedAsync = { ...async };
    updatedAsync[field] = e.target.value;
    dispatchToReduxTestCase(updateAsync(updatedAsync));
  };

  const handleClickDeleteAsync = e => {
    dispatchToReduxTestCase(deleteAsync(async.id));
  };

  const handleChangeActionsFileName = e => {
    const actionsFileName = e.target.value;
    const filePath = filePathMap[actionsFileName] || '';
    dispatchToReduxTestCase(updateActionsFilePath(actionsFileName, filePath));
  };

  const handleChangeTypesFileName = e => {
    const typesFileName = e.target.value;
    const filePath = filePathMap[typesFileName] || '';
    dispatchToReduxTestCase(updateTypesFilePath(typesFileName, filePath));
  };

  return (
    <Draggable draggableId={async.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.modal}
        >
          <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteAsync} />

          <div id={styles.header}>
            <img src={dragIcon} alt='drag' />
            <h3>Async</h3>
          </div>

          <div id={styles.groupFlexbox}>
            <div id={styles.labelInput}>
              <label htmlFor='actionsFile'>Import Actions From</label>
              <input
                type='text'
                placeholder='File Name'
                id={styles.renderInputBox}
                value={async.actionsFile}
                onChange={handleChangeActionsFileName}
              />
            </div>

            <div id={styles.labelInput}>
              <label htmlFor='typesFile'>Import Actions Types From</label>
              <input
                type='text'
                placeholder='File Name'
                id={styles.renderInputBox}
                value={async.typesFile}
                onChange={handleChangeTypesFileName}
              />
            </div>
          </div>

          <div id={styles.groupFlexbox}>
            <div id={styles.labelInput}>
              <label htmlFor='asyncFunction'>Async Function</label>
              <input
                type='text'
                name='asyncFunction'
                onChange={e => handleChangeAsyncFields(e, 'asyncFunction')}
              />
            </div>

            <div id={styles.dropdownWrapper}>
              <label htmlFor='method'>Method</label>
              <div id={styles.dropdownFlex}>
                <select
                  id='method'
                  value={async.method}
                  onChange={e => handleChangeAsyncFields(e, 'method')}
                >
                  <option value='' />
                  <option value='get'>get</option>
                  <option value='post'>post</option>
                  <option value='put'>put</option>
                  <option value='delete'>delete</option>
                </select>
              </div>
            </div>
            <div id={styles.labelInput}>
              <label htmlFor='route'>Route</label>
              <div id={styles.inputFlexBox}>
                <input
                  type='text'
                  name='route'
                  placeholder='eg. /route'
                  onChange={e => handleChangeAsyncFields(e, 'route')}
                />
              </div>
            </div>
          </div>

          <div id={styles.groupFlexbox}>
            <div id={styles.labelInput}>
              <label htmlFor='requestBody'>Request Body</label>
              <div id={styles.inputFlexBox}>
                <input
                  type='text'
                  name='requestBody'
                  onChange={e => handleChangeAsyncFields(e, 'requestBody')}
                />
                <span id={styles.hastooltip} role='tooltip'>
                  <img src={questionIcon} alt='help' />
                  <span id={styles.tooltip}>
                    <ToolTipAsync toolTipType={`object`} />
                  </span>
                </span>
              </div>
            </div>

            <div id={styles.labelInput}>
              <label htmlFor='store'>Store</label>
              <div id={styles.inputFlexBox}>
                <input
                  type='text'
                  name='store'
                  onChange={e => handleChangeAsyncFields(e, 'store')}
                />
                <span id={styles.hastooltip} role='tooltip'>
                  <img src={questionIcon} alt='help' />
                  <span id={styles.tooltip}>
                    <ToolTipAsync toolTipType={`object`} />
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div id={styles.groupFlexbox}>
            <div id={styles.dropdownWrapper}>
              <label htmlFor='matcher'>Matcher</label>
              <div id={styles.dropdownFlex}>
                <select
                  id='matcher'
                  value={async.matcher}
                  onChange={e => handleChangeAsyncFields(e, 'matcher')}
                >
                  <option value='' />
                  <option value='toEqual'>toEqual</option>
                  <option value='toContainEqual'>toContainEqual</option>
                </select>
              </div>
            </div>

            <div id={styles.labelInput}>
              <label htmlFor='expectedResponse'>Expected Response</label>
              <div id={styles.inputFlexBox}>
                <input
                  type='text'
                  name='expectedResponse'
                  onChange={e => handleChangeAsyncFields(e, 'expectedResponse')}
                />
                <span id={styles.hastooltip} role='tooltip'>
                  <img src={questionIcon} alt='help' />
                  <span id={styles.tooltip}>
                    <ToolTipAsync toolTipType={`expectedResponse`} />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Async;

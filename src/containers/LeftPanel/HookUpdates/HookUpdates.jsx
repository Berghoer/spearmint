import React, { useContext } from 'react';
import styles from '../HookUpdates/HookUpdates.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import {
  deleteHookUpdates,
  updateHookUpdates,
  updateHooksFilePath,
} from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const HookUpdates = ({ hookUpdates, index, dispatchToTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);

  const handleChangeHookUpdatesFields = (e, field) => {
    let updatedHookUpdates = { ...hookUpdates };
    updatedHookUpdates[field] = e.target.value;
    dispatchToTestCase(updateHookUpdates(updatedHookUpdates));
  };

  const handleClickDeleteHookUpdates = e => {
    dispatchToTestCase(deleteHookUpdates(hookUpdates.id));
  };

  const handleChangeHookFileName = e => {
    const hookFileName = e.target.value;
    const filePath = filePathMap[hookFileName] || '';
    dispatchToTestCase(updateHooksFilePath(hookFileName, filePath));
  };

  return (
    <Draggable draggableId={hookUpdates.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.hookUpdates}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteHookUpdates}
          />

          <div id={styles.hookUpdatesHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Hook: Updates</h3>
          </div>

          <div id={styles.hooksFlexBox}>
            <div id={styles.hooks}>
              <label htmlFor='hookFile'>Hook File</label>
              <input type='text' id='hookFile' onChange={handleChangeHookFileName} />
            </div>
          </div>

          <div id={styles.cbFlexBox}>
            <div id={styles.cb}>
              <label htmlFor='hook'>Hook</label>
              <input
                type='text'
                id='hook'
                onChange={e => handleChangeHookUpdatesFields(e, 'hook')}
              />
            </div>
            <div id={styles.cb}>
              <label htmlFor='callbackFunc'>Callback Function</label>
              <input
                type='text'
                id='callbackFunc'
                onChange={e => handleChangeHookUpdatesFields(e, 'callbackFunc')}
              />
            </div>
          </div>

          <div id={styles.stateFlexBox}>
            <div id={styles.state}>
              <label htmlFor='managedState'>Managed State</label>
              <input
                type='text'
                id='managedState'
                onChange={e => handleChangeHookUpdatesFields(e, 'managedState')}
              />
            </div>
            <div id={styles.state}>
              <label htmlFor='updatedState'>Updated State</label>
              <input
                type='text'
                id='updatedState'
                onChange={e => handleChangeHookUpdatesFields(e, 'updatedState')}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default HookUpdates;

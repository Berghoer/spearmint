import React, { useContext, Fragment } from 'react';
import styles from '../Reducer/Reducer.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import {
  deleteReducer,
  updateReducer,
  updateTypesFilePath,
  updateReducersFilePath,
} from '../../../context/reduxTestCaseActions';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const Reducer = ({ reducer, index, dispatchToReduxTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);

  const handleChangeReducerFields = (e, field) => {
    let updatedReducer = { ...reducer };
    updatedReducer[field] = e.target.value;
    dispatchToReduxTestCase(updateReducer(updatedReducer));
  };

  const handleClickDeleteReducer = e => {
    dispatchToReduxTestCase(deleteReducer(reducer.id));
  };

  const handleChangeTypesFileName = e => {
    const typesFileName = e.target.value;
    const filePath = filePathMap[typesFileName] || '';
    dispatchToReduxTestCase(updateTypesFilePath(typesFileName, filePath));
  };

  const handleChangeReducersFileName = e => {
    const reducersFileName = e.target.value;
    const filePath = filePathMap[reducersFileName] || '';
    dispatchToReduxTestCase(updateReducersFilePath(reducersFileName, filePath));
  };

  return (
    <Draggable draggableId={reducer.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.reducer}
        >
          <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteReducer} />
          <div id={styles.reducerHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Reducer</h3>
          </div>

          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='typesFile'>Action Types File Name</label>
              <input
                type='text'
                id={styles.renderInputBox}
                value={reducer.typesFile}
                onChange={handleChangeTypesFileName}
              />
            </div>

            <div id={styles.reducerName}>
              <label htmlFor='typesFile'>Reducer File Name</label>
              <input
                type='text'
                id={styles.renderInputBox}
                value={reducer.reducerFile}
                onChange={handleChangeReducersFileName}
              />
            </div>
          </div>
          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='queryValue'>Reducer Name</label>
              <input
                type='text'
                id='queryValue'
                onChange={e => handleChangeReducerFields(e, 'queryValue')}
              />
            </div>

            <div id={styles.reducerName}>
              <label htmlFor='querySelector'>Initial State</label>
              <input
                type='text'
                id='querySelector'
                onChange={e => handleChangeReducerFields(e, 'querySelector')}
              />
            </div>
          </div>

          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='queryVariant'>Action</label>
              <input
                type='text'
                id='queryVariant'
                onChange={e => handleChangeReducerFields(e, 'queryVariant')}
              />
            </div>

            <div id={styles.reducerName}>
              <label htmlFor='matcherValue'>Updated State</label>
              <input
                type='text'
                id='matcherValue'
                onChange={e => handleChangeReducerFields(e, 'matcherValue')}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Reducer;

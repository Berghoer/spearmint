import React, { useState } from 'react';
import styles from './TestMenu.module.scss';
import {
  addAsync,
  addReducer,
  addActionCreator,
  addMiddleware,
  openInfoModal,
  createNewReduxTest,
} from '../../context/actions/reduxTestCaseActions';
import NewTestModal from '../Modals/NewTestModal';

interface ReduxTestMenuProps {
  dispatchToReduxTestCase: (action: object) => void;
}

const ReduxTestMenu = ({ dispatchToReduxTestCase }: ReduxTestMenuProps) => {
  /* making new state for this componenet, naming it isMOdalOpen, making method for it called setIsModalOpen, setting initial state to false */
  const [isReduxModalOpen, setIsReduxModalOpen] = useState(false);

  const openReduxModal = () => {
    setIsReduxModalOpen(true);
  };

  const closeReduxModal = () => {
    setIsReduxModalOpen(false);
  };

  const handleAddMiddleware = () => {
    dispatchToReduxTestCase(addMiddleware());
  };
  const handleAddActionCreator = () => {
    dispatchToReduxTestCase(addActionCreator());
  };
  const handleAddAsync = () => {
    dispatchToReduxTestCase(addAsync());
  };
  const handleAddReducer = () => {
    dispatchToReduxTestCase(addReducer());
  };
  const modalOpener = () => {
    dispatchToReduxTestCase(openInfoModal());
  };
  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openReduxModal}>New Test +</button>
          <NewTestModal
            dispatchToMockData={null}
            createNewTest={createNewReduxTest}
            isModalOpen={isReduxModalOpen}
            closeModal={closeReduxModal}
            dispatchToTestCase={dispatchToReduxTestCase}
          />
          <button id={styles.example} onClick={modalOpener}>
            example
          </button>
        </div>
        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button data-testid='reducerButton' onClick={handleAddReducer}>
            Reducer
          </button>
          <button data-testid='actionCreatorButton' onClick={handleAddActionCreator}>
            Action Creator
          </button>
          <button data-testid='asyncButton' onClick={handleAddAsync}>
            Async Action Creator
          </button>
          <button data-testid='middlewareButton' onClick={handleAddMiddleware}>
            Middleware
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReduxTestMenu;

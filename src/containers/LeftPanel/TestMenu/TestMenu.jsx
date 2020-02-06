import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import {
  addAction,
  addAssertion,
  addRender,
  addAsync,
  addReducer,
  addActionCreator,
  addMiddleware,
  addContexts,
  addHookUpdates,
  addHookRender,
  addEndpoint
} from '../../../context/testCaseActions';
import NewTestModal from '../../NavBar/Modals/NewTestModal';

const TestMenu = ({ dispatchToTestCase, dispatchToMockData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddAction = e => {
    dispatchToTestCase(addAction());
  };
  const handleAddAssertion = e => {
    dispatchToTestCase(addAssertion());
  };
  const handleAddRender = e => {
    dispatchToTestCase(addRender());
  };
  const handleAddReducer = e => {
    dispatchToTestCase(addReducer());
  };
  const handleAddActionCreator = e => {
    dispatchToTestCase(addActionCreator());
  };
  const handleAddMiddleware = e => {
    dispatchToTestCase(addMiddleware());
  };
  const handleAddContext = e => {
    dispatchToTestCase(addContexts());
  };
  const handleAddAsync = e => {
    dispatchToTestCase(addAsync());
  };
  const handleAddHookRender = e => {
    dispatchToTestCase(addHookRender());
  };

  const handleAddHookUpdates = e => {
    dispatchToTestCase(addHookUpdates());
  };

  const handleAddEndpoint = e => {
    dispatchToTestCase(addEndpoint());
  };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal}>New Test +</button>
          <NewTestModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchToMockData={dispatchToMockData}
            dispatchToTestCase={dispatchToTestCase}
          />
        </div>
        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button onClick={handleAddAction}>Action</button>
          <button data-testid='assertionButton' onClick={handleAddAssertion}>
            Assertion
          </button>
          <button data-testid='rerenderButton' onClick={handleAddRender}>
            Rerender
          </button>
          <button data-testid='reducerButton' onClick={handleAddReducer}>
            Reducer
          </button>
          <button data-testid='asyncButton' onClick={handleAddAsync}>
            Async Action Creator
          </button>
          <button data-testid='middlewareButton' onClick={handleAddMiddleware}>
            Middleware
          </button>
          <button data-testid='contextButton' onClick={handleAddContext}>
            Context
          </button>
          <button data-testid='actionCreatorButton' onClick={handleAddActionCreator}>
            Action Creator
          </button>
          <button data-testid='hookRenderButton' onClick={handleAddHookRender}>Hook: Rendering</button>

          <button data-testid='hookUpdatesButton' onClick={handleAddHookUpdates}>
            Hook: Updates
          </button>
          <button data-testid='endPointButton' onClick={handleAddEndpoint}>
            Endpoint
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestMenu;

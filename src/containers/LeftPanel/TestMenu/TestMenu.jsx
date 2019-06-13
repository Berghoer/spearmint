import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addAction, addAssertion, addRender } from '../../../context/testCaseActions';
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
    let testing = document.createElement('p');
    let div1 = document.getElementById('test');
    testing.innerHTML = 'computer';
    div1.appendChild(testing);
  };
  const handleAddRender = e => {
    dispatchToTestCase(addRender());
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
        <div id={styles.right}>
          <button onClick={handleAddAction}>Action</button>
          <button data-testid='assertionButton' onClick={handleAddAssertion}>
            Assertion
          </button>
          <button data-testid='rerenderButton' onClick={handleAddRender}>
            Rerender
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestMenu;

import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addDescribeBlock } from '../../../context/reactTestCaseActions';
import NewTestModal from '../../NavBar/Modals/NewTestModal';

const ReactTestMenu = ({ dispatchToTestCase, dispatchToMockData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleAddDescribeBlock = e => {
    dispatchToTestCase(addDescribeBlock());
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
          <button onClick={handleAddDescribeBlock}>+Describe Block</button>
        </div>
      </div>
    </div>
  );
};

export default ReactTestMenu;

import React, { useState } from 'react';
import styles from './TestMenu.module.scss';
import PuppeteerTestModal from '../Modals/PuppeteerTestModal';
import {
  addPuppeteerPaintTiming,
  openInfoModal,
} from '../../context/actions/puppeteerTestCaseActions';
import { PuppeteerTestMenuProps } from '../../utils/puppeteerTypes';

const PuppeteerTestMenu = ({ dispatchToPuppeteerTestCase }: PuppeteerTestMenuProps) => {
  const [isPuppeteerModalOpen, setIsPuppeteerModalOpen] = useState(false);

  const openPuppeteerModal = () => {
    setIsPuppeteerModalOpen(true);
  };

  const closePuppeteerModal = () => {
    setIsPuppeteerModalOpen(false);
  };

  const handleAddPuppeteerPaintTiming = () => {
    dispatchToPuppeteerTestCase(addPuppeteerPaintTiming());
  };
  const modalOpener = () => {
    dispatchToPuppeteerTestCase(openInfoModal());
  };
  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type='button' data-testid='puppeteerNewTestButton' onClick={openPuppeteerModal}>
            New Test +
          </button>
          <PuppeteerTestModal
            isPuppeteerModalOpen={isPuppeteerModalOpen}
            closePuppeteerModal={closePuppeteerModal}
            dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase}
          />
          <button id={styles.example} onClick={modalOpener}>
            example
          </button>
        </div>
        <div id={styles.right}>
          <button
            type='button'
            data-testid='puppeteerPaintTimingButton'
            onClick={handleAddPuppeteerPaintTiming}
          >
            Paint Timing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuppeteerTestMenu;

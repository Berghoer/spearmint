import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewHooksTest } from '../../context/actions/hooksTestCaseActions';
import styles from './ExportFileModal.module.scss';
import { toggleModal, updateFile } from '../../context/actions/globalActions';
import { HooksTestModalProps } from '../../utils/hooksTypes';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';

const HooksTestModal = ({ isHooksModalOpen, closeHooksModal }: HooksTestModalProps) => {
  const [, dispatchToGlobal] = useContext<any>(GlobalContext);
  const [, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);

  const handleNewHooksTest = () => {
    dispatchToHooksTestCase(createNewHooksTest());
    closeHooksModal();
    dispatchToGlobal(toggleModal());
    dispatchToGlobal(updateFile(''));
  };

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  return (
    <div>
      <ReactModal
        className={styles.modal}
        isOpen={isHooksModalOpen}
        onRequestClose={closeHooksModal}
        contentLabel='Save?'
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        ariaHideApp={false}
        style={modalStyles}
      >
        <div id={styles.title}>
          <p>New Test</p>
        </div>
        <div id={styles.body}>
          <p id={styles.text}>
            Do you want to start a new test? All unsaved changes
            <br />
            will be lost.
          </p>
          <span id={styles.newTestButtons}>
            <div>
              <button type='button' id={styles.save} onClick={handleNewHooksTest}>
                Continue
              </button>
            </div>
            <button type='button' id={styles.save} onClick={closeHooksModal}>
              Cancel
            </button>
          </span>
        </div>
      </ReactModal>
    </div>
  );
};

export default HooksTestModal;

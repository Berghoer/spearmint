import React, { useContext } from 'react';
<<<<<<< HEAD
import { closeInfoModal } from '../../context/actions/reactTestCaseActions';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import ReactModal from 'react-modal';
import styles from '../../components/TestHelpModals/ReactHelpModal.module.scss';
=======
import ReactModal from 'react-modal';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { closeInfoModal } from '../../context/actions/reactTestCaseActions';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import styles from '../../components/TestHelpModals/ReactHelpModal.module.scss';

>>>>>>> 0698f4709fc4a74a66f12c08ce4b9ade580ddc28
const closeIcon = require('../../assets/images/close.png');
const describe = require('../../assets/images/describe.png');

const ReactHelpModal = () => {
<<<<<<< HEAD
  const [{ modalOpen }, dispatchToTestCase] = useContext(ReactTestCaseContext);

=======
  const [_, dispatchToGlobal] = useContext(GlobalContext);
  // Hooks testing docs url
  const reactUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';

  const [{ modalOpen }, dispatchToTestCase] = useContext(ReactTestCaseContext);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reactUrl));
    dispatchToTestCase(closeInfoModal());
  };

>>>>>>> 0698f4709fc4a74a66f12c08ce4b9ade580ddc28
  const closeModal = () => {
    dispatchToTestCase(closeInfoModal());
  };

  return (
    <ReactModal
      className={styles.modal}
      shouldCloseOnEsc={true}
      isOpen={modalOpen}
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      ariaHideApp={false}
    >
      <img src={closeIcon} onClick={closeModal} />
      <h2>Describe(name, fn)</h2>
      <p>
        Describe creates a block that groups together several related tests. The name argument is
        simply the name of component you're testing. fn argument is the test callback function{' '}
      </p>
      <img src={describe} />
<<<<<<< HEAD
=======
      <a onClick={openDocs}>Need More Help?</a>
>>>>>>> 0698f4709fc4a74a66f12c08ce4b9ade580ddc28
    </ReactModal>
  );
};

export default ReactHelpModal;

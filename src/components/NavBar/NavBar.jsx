/**
 * nav pannel
 * to export files, switch views, or open a new folder
 */

import React, { useState, useContext } from 'react';
import styles from './NavBar.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  toggleFileDirectory,
  toggleRightPanel,
  toggleExportBool,
} from '../../context/actions/globalActions';
import FileDirectory from '../FileDirectory/FileDirectory';
import OpenFolder from '../OpenFolder/OpenFolderButton';
import ExportFileModal from '../Modals/ExportFileModal';
// import BrowserModal from '../Modals/BrowserModal';

const menuIcon = require('../../assets/images/menu.png');
const exportIcon = require('../../assets/images/file-export.png');
const browserIcon = require('../../assets/images/google-chrome.png');
const codeIcon = require('../../assets/images/visual-studio-code.png');

const NavBar = () => {
  const [{ fileTree, isFileDirectoryOpen, url, exportBool }, dispatchToGlobal] = useContext(
    GlobalContext
  );
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  // const [isBrowserModalOpen, setIsBrowserModalOpen] = useState(false);

  /* opens/closes the filedirectory */
  const handleToggleFileDirectory = () => {
    dispatchToGlobal(toggleFileDirectory());
  };

  /* switches between code and browser view */
  const handleEditorToggle = () => {
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
  };

  /* switches between code and browser view */
  const handleBrowserToggle = () => {
    console.log('handling Toggle');
    dispatchToGlobal(toggleRightPanel('browserView'));
  };

  /* exports the file (when true) */
  const openExportModal = () => {
    dispatchToGlobal(toggleExportBool());
    setIsExportModalOpen(true);
  };

  /* closes the browser modal (box users type url in) */
  // const closeBrowserModal = () => {
  //   setIsBrowserModalOpen(false);
  // };

  /**
   * renders: buttons + icons for navbar, exportFileModal, boxes to open new folder and enter url, file directory
   */
  return (
    <div id={styles.navBar}>
      <button className={styles.navBtn} onClick={handleToggleFileDirectory}>
        <img src={menuIcon} className={styles.icons} alt='fileExplorer' />
        <span className={styles.tooltip}>Expand File Explorer</span>
      </button>
      <button className={styles.navBtn} onClick={openExportModal}>
        <img src={exportIcon} className={styles.icons} alt='export' title='Export a test file' />
        <span className={styles.tooltip}>Export</span>
      </button>
      <ExportFileModal
        isExportModalOpen={isExportModalOpen}
        setIsExportModalOpen={setIsExportModalOpen}
      />
      <OpenFolder />
      <button className={styles.navBtn} onClick={handleEditorToggle}>
        <img src={codeIcon} className={styles.icons} alt='codeview' title='Code View' />
        <span className={styles.tooltip}>Code View</span>
      </button>
      <button className={styles.navBtn} onClick={handleBrowserToggle}>
        <img src={browserIcon} className={styles.icons} alt='browserview' title='Browser view' />
        <span className={styles.tooltip}>Browser View</span>
      </button>
      {/* <BrowserModal isBrowserModalOpen={isBrowserModalOpen} closeBrowserModal={closeBrowserModal} /> */}

      {isFileDirectoryOpen && <FileDirectory fileTree={fileTree} />}
    </div>
  );
};

export default NavBar;

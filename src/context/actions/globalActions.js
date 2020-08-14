export const actionTypes = {
  SET_PROJECT_URL: 'SET_PROJECT_URL',
  LOAD_PROJECT: 'LOAD_PROJECT',
  CREATE_FILE_TREE: 'CREATE_FILE_TREE',
  SET_COMPONENT_NAME: 'SET_COMPONENT_NAME',
  TOGGLE_FILE_DIRECTORY: 'TOGGLE_FILE_DIRECTORY',
  CLOSE_RIGHT_PANEL: 'CLOSE_RIGHT_PANEL',
  TOGGLE_RIGHT_PANEL: 'TOGGLE_RIGHT_PANEL',
  DISPLAY_FILE_CODE: 'DISPLAY_FILE_CODE',
  TOGGLE_FOLDER_VIEW: 'TOGGLE_FOLDER_VIEW',
  SET_DEFAULT_FILE_HIGHLIGHTING: 'SET_DEFAULT_FILE_HIGHLIGHTING',
  HIGHLIGHT_FILE: 'HIGHLIGHT_FILE',
  SET_PROJECT_FILE_PATH: 'SET_PROJECT_FILE_PATH',
  SET_FILE_PATH_MAP: 'SET_FILE_PATH_MAP',
  CREATE_FILE_SHOW: 'CREATE_FILE_SHOW',

  //added
  SET_TEST_CASE: 'SET_TEST_CASE',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
};

export const setProjectUrl = (url) => ({
  type: actionTypes.SET_PROJECT_URL,
  url,
});

export const loadProject = (load) => ({
  type: actionTypes.LOAD_PROJECT,
  load,
});

export const createFileTree = (fileTree) => ({
  type: actionTypes.CREATE_FILE_TREE,
  fileTree,
});

export const setComponentName = (componentName) => ({
  type: actionTypes.SET_COMPONENT_NAME,
  componentName,
});

export const toggleFileDirectory = () => ({
  type: actionTypes.TOGGLE_FILE_DIRECTORY,
});

export const closeRightPanel = () => ({
  type: actionTypes.CLOSE_RIGHT_PANEL,
});

export const toggleRightPanel = (display) => ({
  type: actionTypes.TOGGLE_RIGHT_PANEL,
  display,
});

export const displayFileCode = (displayedFileCode) => ({
  type: actionTypes.DISPLAY_FILE_CODE,
  displayedFileCode,
});

export const toggleFolderView = (filePath) => ({
  type: actionTypes.TOGGLE_FOLDER_VIEW,
  filePath,
});

export const highlightFile = (fileName) => ({
  type: actionTypes.HIGHLIGHT_FILE,
  fileName,
});

export const setProjectFilePath = (projectFilePath) => ({
  type: actionTypes.SET_PROJECT_FILE_PATH,
  projectFilePath,
});

export const setFilePathMap = (filePathMap) => ({
  type: actionTypes.SET_FILE_PATH_MAP,
  filePathMap,
});

export const createFile = (testString) => ({
  type: actionTypes.CREATE_FILE_SHOW,
  testString,
});

//added
export const setTestCase = (testCase) => ({
  type: actionTypes.SET_TEST_CASE,
  testCase,
});

export const toggleModal = () => ({
  type: actionTypes.TOGGLE_MODAL,
});

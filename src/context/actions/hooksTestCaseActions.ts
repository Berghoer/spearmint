import { HooksStatements } from '../../utils/hooksTypes';

export const actionTypes = {
  TOGGLE_HOOKS: 'TOGGLE_HOOKS',
  UPDATE_HOOKS_TEST_STATEMENT: 'UPDATE_HOOKS_TEST_STATEMENT',
  ADD_CONTEXT: 'ADD_CONTEXT',
  DELETE_CONTEXT: 'DELETE_CONTEXT',
  UPDATE_CONTEXT: 'UPDATE_CONTEXT',
  ADD_HOOKRENDER: 'ADD_HOOKRENDER',
  DELETE_HOOKRENDER: 'DELETE_HOOKRENDER',
  UPDATE_HOOKRENDER: 'UPDATE_HOOKRENDER',
  ADD_HOOK_UPDATES: 'ADD_HOOK_UPDATES',
  DELETE_HOOK_UPDATES: 'DELETE_HOOK_UPDATE',
  UPDATE_HOOK_UPDATES: 'UPDATE_HOOK_UPDATES',
  UPDATE_HOOKS_FILEPATH: 'UPDATE_HOOKS_FILEPATH',
  UPDATE_CONTEXT_FILEPATH: 'UPDATE_CONTEXT_FILEPATH',
  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  CREATE_NEW_HOOKS_TEST: 'CREATE_NEW_HOOKS_TEST',
};

export const toggleHooks = () => ({
  type: actionTypes.TOGGLE_HOOKS,
});

export const updateHooksTestStatement = (hooksTestStatement: string) => ({
  type: actionTypes.UPDATE_HOOKS_TEST_STATEMENT,
  hooksTestStatement,
});

export const addContexts = () => ({
  type: actionTypes.ADD_CONTEXT,
});

export const deleteContexts = (id: number) => ({
  type: actionTypes.DELETE_CONTEXT,
  id,
});

export const updateContexts = (contexts: object) => ({
  ...contexts,
  type: actionTypes.UPDATE_CONTEXT,
});

export const addHookUpdates = () => ({
  type: actionTypes.ADD_HOOK_UPDATES,
});

export const deleteHookUpdates = (id: number) => ({
  type: actionTypes.DELETE_HOOK_UPDATES,
  id,
});

export const updateHookUpdates = (hooksUpdates: object) => ({
  ...hooksUpdates,
  type: actionTypes.UPDATE_HOOK_UPDATES,
});

export const addHookRender = () => ({
  type: actionTypes.ADD_HOOKRENDER,
});

export const deleteHookRender = (id: number) => ({
  type: actionTypes.DELETE_HOOKRENDER,
  id,
});

export const updateHookRender = (hookRenders: object) => ({
  ...hookRenders,
  type: actionTypes.UPDATE_HOOKRENDER,
});

export const updateHooksFilePath = (hookFileName: string, hookFilePath: string) => ({
  type: actionTypes.UPDATE_HOOKS_FILEPATH,
  hookFileName,
  hookFilePath,
});

export const updateContextFilePath = (contextFileName: string, contextFilePath: string) => ({
  type: actionTypes.UPDATE_CONTEXT_FILEPATH,
  contextFileName,
  contextFilePath,
});

export const createNewHooksTest = () => ({
  type: actionTypes.CREATE_NEW_HOOKS_TEST,
});

export const updateStatementsOrder = (draggableStatements: Array<HooksStatements>) => ({
  type: actionTypes.UPDATE_STATEMENTS_ORDER,
  draggableStatements,
});

import { createContext } from 'react';
import { actionTypes } from './puppeteerTestCaseActions';

export const PuppeteerTestCaseContext = createContext(null);

export const puppeteerTestCaseState = {
  puppeteerTestStatement: '',
  puppeteerStatements: [],
  hasPuppeteer: 0,
};

let statementId = 0;

const createPuppeteerForm = () => ({
  id: statementId++,
  type: 'puppeteerForm',
});

export const puppeteerTestCaseReducer = (state, action) => {
  Object.freeze(state);
  let puppeteerStatements = [...state.puppeteerStatements];

  switch (action.type) {
    case actionTypes.TOGGLE_PUPPETEER:
      return {
        ...state,
        hasPuppeteer: state.hasPuppeteer + 1,
      };

    case actionTypes.ADD_PUPPETEERFORM:
      puppeteerStatements.push(createPuppeteerForm());
      return {
        ...state,
        puppeteerStatements,
      };
    case actionTypes.DELETE_PUPPETEERFORM:
      puppeteerStatements = puppeteerStatements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        puppeteerStatements,
      };

    case actionTypes.CREATE_NEW_PUPPETEER_TEST:
      return {
        puppeteerTestStatement: '',
        puppeteerStatements: [],
        hasPuppeteer: 0,
      };
    default:
      return state;
  }
};

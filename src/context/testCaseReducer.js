import { createContext } from 'react';
import { actionTypes } from './testCaseActions';

export const TestCaseContext = createContext(null);

export const testCaseState = {
  testStatement: '',
  hasReact: false,
  statements: [
    {
      id: 0,
      type: 'render',
      componentName: '',
      filePath: '',
      props: [],
      hasProp: false,
    },
    {
      id: 1,
      type: 'assertion',
      queryVariant: '',
      querySelector: '',
      queryValue: '',
      isNot: false,
      matcherType: '',
      matcherValue: '',
      suggestions: [],
    },
  ],
};

let statementId = 2;
let renderPropsId = 0;

const createAction = () => ({
  id: statementId++,
  type: 'action',
  eventType: '',
  eventValue: null,
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  suggestions: [],
});

const createAssertion = () => ({
  id: statementId++,
  type: 'assertion',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  isNot: false,
  matcherType: '',
  matcherValue: '',
  suggestions: [],
});

const createRerender = (componentName, filePath) => ({
  id: statementId++,
  type: 'render',
  componentName,
  filePath,
  props: [],
});

const createRenderProp = () => ({
  id: renderPropsId++,
  propKey: '',
  propValue: '',
});

const createContexts = () => ({
  /* renders the action card when the "action" button is clicked */
  id: statementId++,
  type: 'context',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  values: '',
  textNode: '',
  providerComponent: '',
  consumerComponent: '',
  context: '',
  contextFileName: '',
  contextFilePath: '',
});

const createHookRender = () => ({
  id: statementId++,
  type: 'hookRender',
  hookFileName: '',
  hookFilePath: '',
  hook: '',
  parameterOne: '',
  parameterTwo: '',
  returnValue: '',
});

const createHookUpdates = () => ({
  id: statementId++,
  hookFileName: '',
  hookFilePath: '',
  type: 'hook-updates',
  hook: '',
  callbackFunc: '',
  managedState: '',
  updatedState: '',
});

export const testCaseReducer = (state, action) => {
  Object.freeze(state);
  let statements = [...state.statements];
  let lastAssertionStatement;

  switch (action.type) {
    case actionTypes.TOGGLE_REACT:
      let newTestStatement;
      if (!state.hasReact) {
        newTestStatement = action.testStatement;
      }
      return {
        ...state,
        newTestStatement,
        hasReact: !state.hasReact,
      };
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      const firstRenderStatement = statements[0];
      lastAssertionStatement = statements[statements.length - 1];
      statements = [firstRenderStatement, ...action.draggableStatements, lastAssertionStatement];
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_TEST_STATEMENT:
      let testStatement = action.testStatement;
      return {
        ...state,
        testStatement,
      };
    case actionTypes.ADD_ACTION:
      lastAssertionStatement = statements.pop();
      statements.push(createAction(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ACTION:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ACTION:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.eventType = action.eventType;
          statement.eventValue = action.eventValue;
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.suggestions = action.suggestions;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_ASSERTION:
      lastAssertionStatement = statements.pop();
      statements.push(createAssertion(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ASSERTION:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ASSERTION:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.isNot = action.isNot;
          statement.matcherType = action.matcherType;
          statement.matcherValue = action.matcherValue;
          statement.suggestions = action.suggestions;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_RENDER:
      lastAssertionStatement = statements.pop();
      const renderComponentName = state.statements[0].componentName;
      const renderFilePath = state.statements[0].filePath;
      statements.push(createRerender(renderComponentName, renderFilePath), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_RENDER:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
        lastAssertionStatement,
      };
    case actionTypes.UPDATE_RENDER_COMPONENT:
      statements = statements.map(statement => {
        if (statement.type === 'render') {
          statement.componentName = action.componentName;
          statement.filePath = action.filePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
          statement.props.push(createRenderProp());
        }
        return statement;
      });
      return {
        ...state,
        statements,
        hasProp: !statements[0].hasProp,
      };
    case actionTypes.DELETE_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
          statement.props = statement.props.filter(prop => prop.id !== action.propId);
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
          statement.props.map(prop => {
            if (prop.id === action.propId) {
              prop.propKey = action.propKey;
              prop.propValue = action.propValue;
            }
            return prop;
          });
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.ADD_CONTEXT:
      lastAssertionStatement = statements.pop(); /* popping off the last render */
      statements.push(
        createContexts(),
        lastAssertionStatement
      ); /* pushing the new middlewaew the user created into the statements array and then adding back the last render */
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_CONTEXT:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(
        statement => statement.id !== action.id
      ); /* if statement id !== acion id, then what?? */
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_CONTEXT:
      statements = statements.map(statement => {
        /* update statements if statement id === action id */
        if (statement.id === action.id) {
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.values = action.values;
          statement.textNode = action.textNodes;
          statement.providerComponent = action.providerComponent;
          statement.consumerComponent = action.consumerComponent;
          statement.context = action.context;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.ADD_HOOK_UPDATES:
      lastAssertionStatement = statements.pop();
      statements.push(createHookUpdates(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.DELETE_HOOK_UPDATES:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_HOOK_UPDATES:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.hook = action.hook;
          statement.hookFileName = action.hookFileName;
          statement.hookFilePath = action.hookFilePath;
          statement.callbackFunc = action.callbackFunc;
          statement.managedState = action.managedState;
          statement.updatedState = action.updatedState;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.ADD_HOOKRENDER:
      lastAssertionStatement = statements.pop();
      statements.push(createHookRender(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.DELETE_HOOKRENDER:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_HOOKRENDER:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.hook = action.hook;
          statement.parameterOne = action.parameterOne;
          statement.expectedReturnValue = action.expectedReturnValue;
          statement.returnValue = action.returnValue;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_HOOKS_FILEPATH:
      statements = statements.map(statement => {
        if (statement.type === 'hook-updates' || statement.type === 'hookRender') {
          statement.hookFileName = action.hookFileName;
          statement.hookFilePath = action.hookFilePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_CONTEXT_FILEPATH:
      statements = statements.map(statement => {
        if (statement.type === 'context') {
          statement.contextFileName = action.contextFileName;
          statement.contextFilePath = action.contextFilePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.CREATE_NEW_TEST:
      return {
        testStatement: '',
        statements: [
          {
            id: 0,
            type: 'render',
            componentName: '',
            filePath: '',
            props: [],
            hasProp: false,
          },
          {
            id: 1,
            type: 'assertion',
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            isNot: false,
            matcherType: '',
            matcherValue: '',
            suggestions: [],
          },
        ],
      };
    default:
      return state;
  }
};

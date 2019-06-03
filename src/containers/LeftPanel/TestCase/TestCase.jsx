import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import TestMenu from '../TestMenu/TestMenu';
import MockData from '../MockData/MockData';
import Action from '../Action/Action';
import Assertion from '../Assertion/Assertion';
import Render from '../Render/Render';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { MockDataContext } from '../../../context/mockDataReducer';
import { updateTestStatement } from '../../../context/testCaseActions';
import { toggleMockData, addMockData } from '../../../context/mockDataActions';

const plusIcon = require('../../../assets/images/plus-box.png');

const TestCase = () => {
  const [testCase, dispatchTestCase] = useContext(TestCaseContext);
  const [mockData, dispatchMockData] = useContext(MockDataContext);

  const handleUpdateTestStatement = e => {
    dispatchTestCase(updateTestStatement(e.target.value));
  };

  const handleToggleMockData = () => {
    dispatchMockData(toggleMockData());
  };

  const handleAddMockData = () => {
    dispatchMockData(addMockData());
  };

  const mockDataJSX = mockData.mockData.map(mockDatum => {
    return (
      <MockData
        key={mockDatum.id}
        mockDatumId={mockDatum.id}
        dispatchMockData={dispatchMockData}
        fieldKeys={mockDatum.fieldKeys}
      />
    );
  });

  const statementsJSX = testCase.statements.map(statement => {
    switch (statement.type) {
      case 'action':
        return <Action key={statement.id} id={statement.id} dispatchTestCase={dispatchTestCase} />;
      case 'assertion':
        return (
          <Assertion key={statement.id} id={statement.id} dispatchTestCase={dispatchTestCase} />
        );
      case 'render':
        return (
          <Render
            key={statement.id}
            id={statement.id}
            dispatchTestCase={dispatchTestCase}
            props={statement.props}
            reRender={statement.reRender}
          />
        );
      default:
        return <></>;
    }
  });

  return (
    <div id={styles.testCase}>
      <TestMenu dispatchTestCase={dispatchTestCase} />
      <section id={styles.testCaseHeader}>
        <label htmlFor='test-statement'>Test:</label>
        <input
          type='text'
          id='test-statement'
          value={testCase.testStatement}
          onChange={handleUpdateTestStatement}
        />
      </section>
      <section id={styles.testCaseHeader}>
        <label htmlFor='mock-data-checkbox' id='mock-data-checkbox'>
          Will you need mock data?
        </label>
        <input
          type='checkbox'
          id='mock-data-checkbox'
          disabled={mockDataJSX.length}
          onClick={handleToggleMockData}
        />
      </section>
      {mockData.mockDataCheckBox && (
        <section id={styles.mockDataHeader}>
          <label htmlFor='mock-data'>Mock data</label>
          <img src={plusIcon} alt='add' onClick={handleAddMockData} />
          {mockDataJSX}
        </section>
      )}
      <div>{statementsJSX}</div>
    </div>
  );
};

export default TestCase;

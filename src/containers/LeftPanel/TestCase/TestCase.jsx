import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { updateTestStatement, updateStatementsOrder } from '../../../context/testCaseActions';
import { MockDataContext } from '../../../context/mockDataReducer';
import { toggleMockData, addMockData } from '../../../context/mockDataActions';
import TestMenu from '../TestMenu/TestMenu';
import MockData from '../MockData/MockData';
import TestStatements from './TestStatements';
import FirstRender from '../Render/FirstRender';
import LastAssertion from '../Assertion/LastAssertion';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const plusIcon = require('../../../assets/images/plus.png');

const TestCase = () => {
  const [{ testStatement, statements }, dispatchToTestCase] = useContext(TestCaseContext);
  const [{ mockData, mockDataCheckBox }, dispatchToMockData] = useContext(MockDataContext);
  const firstRenderStatement = statements[0];
  console.log(firstRenderStatement)
  const draggableStatements = statements.slice(1, -1);
  const lastAssertionStatement = statements[statements.length - 1];

  const handleUpdateTestStatement = e => {
    dispatchToTestCase(updateTestStatement(e.target.value));
  };

  const handleToggleMockData = () => {
    dispatchToMockData(toggleMockData());
  };

  const handleAddMockData = () => {
    dispatchToMockData(addMockData());
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements = reorder(
      draggableStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToTestCase(updateStatementsOrder(reorderedStatements));
  };

  const mockDataJSX = mockData.map(mockDatum => {
    return (
      <MockData
        key={mockDatum.id}
        mockDatumId={mockDatum.id}
        dispatchToMockData={dispatchToMockData}
        fieldKeys={mockDatum.fieldKeys}
      />
    );
  });

  return (
    <div>
      <TestMenu dispatchToTestCase={dispatchToTestCase} />
      <section id={styles.testCaseHeader}>
        <label htmlFor='test-statement'>Test:</label>
        <input
          type='text'
          id={styles.testStatement}
          value={testStatement}
          onChange={handleUpdateTestStatement}
        />
      </section>
      <section id={styles.mockHeader}>
        <span>
          <label htmlFor='mock-data-checkbox' id='mock-data-checkbox'>
            Will you need mock data?
          </label>
          <input
            type='checkbox'
            id='mock-data-checkbox'
            disabled={mockDataJSX.length}
            onClick={handleToggleMockData}
          />
        </span>
      </section>
      {mockDataCheckBox && (
        <section id={styles.mockDataHeader}>
          <label htmlFor='mock-data'>Mock data</label>
          <img src={plusIcon} alt='add' onClick={handleAddMockData} />
          {mockDataJSX}
        </section>
      )}
      <FirstRender
        key={firstRenderStatement.id}
        render={firstRenderStatement}
        dispatchToTestCase={dispatchToTestCase}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TestStatements
                statements={draggableStatements}
                dispatchToTestCase={dispatchToTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <LastAssertion
        key={lastAssertionStatement.id}
        assertion={lastAssertionStatement}
        dispatchToTestCase={dispatchToTestCase}
        isLast={true}
      />
    </div>
  );
};
export default TestCase;

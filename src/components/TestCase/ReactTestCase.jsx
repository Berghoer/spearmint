import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './TestCase.module.scss';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import {
  updateDescribeText,
  updateRenderComponent,
  updateItStatementText,
} from '../../context/actions/reactTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { addMockData } from '../../context/actions/mockDataActions';
import ReactTestMenu from '../TestMenu/ReactTestMenu';
import MockData from '../MockData/MockData';
import DecribeRenderer from '../DescribeRenderer/DescribeRenderer';
import ReactHelpModal from '../TestHelpModals/ReactHelpModal';

const ReactTestCase = () => {
  const [
    { describeBlocks, itStatements, statements, modalOpen },
    dispatchToReactTestCase,
  ] = useContext(ReactTestCaseContext);
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap }] = useContext(GlobalContext);
  const draggableStatements = describeBlocks.allIds;

  const handleAddMockData = () => {
    dispatchToMockData(addMockData());
  };

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToReactTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToReactTestCase(updateItStatementText(text, itId));
  };

  // let ReactInfoModal = null;
  // if (modalOpen) ReactInfoModal = <ReactHelpModal />;

  return (
    <div id={styles.ReactTestCase}>
      <div id='head'>
        <ReactTestMenu
          dispatchToTestCase={dispatchToReactTestCase}
          dispatchToMockData={dispatchToMockData}
        />
      </div>
      {modalOpen ? <ReactHelpModal /> : null}
      <div className={styles.header}>
        <div className={styles.renderComponent}>
          <span className={styles.renderLabel}>Enter Component Name:</span>
          <SearchInput
            reactTestCase
            dispatch={dispatchToReactTestCase}
            action={updateRenderComponent}
            filePathMap={filePathMap}
            options={Object.keys(filePathMap)}
          />
        </div>
        <button type='button' className={styles.mockBtn} onClick={handleAddMockData}>
          <i className={cn(styles.addIcon, 'fas fa-plus')} />
          Mock Data
        </button>
      </div>
      {mockData.length > 0 && (
        <section id={styles.mockDataHeader}>
          {mockData.map((data) => {
            return (
              <MockData
                key={data.id}
                mockDatumId={data.id}
                dispatchToMockData={dispatchToMockData}
                fieldKeys={data.fieldKeys}
              />
            );
          })}
        </section>
      )}
      <DecribeRenderer
        dispatcher={dispatchToReactTestCase}
        draggableStatements={draggableStatements}
        describeBlocks={describeBlocks}
        itStatements={itStatements}
        statements={statements}
        handleChangeDescribeText={handleChangeDescribeText}
        handleChangeItStatementText={handleChangeItStatementText}
        type='react'
      />
    </div>
  );
};
export default ReactTestCase;

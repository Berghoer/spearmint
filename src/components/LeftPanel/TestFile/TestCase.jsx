import React, { useContext } from "react";
import TestMenu from "./TestCase/TestMenu";
import MockData from "./TestCase/MockData";
import Action from "./TestCase/Action";
import Assertion from "./TestCase/Assertion";
import Render from "./TestCase/Render";
import { TestCaseContext, MockDataContext } from "../../../App";
import { updateTestStatement } from "../../../context/testCaseActions";
import {
  toggleMockData,
  addMockData
} from "../../../context/mockDataActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      case "action":
        return (
          <Action
            key={statement.id}
            id={statement.id}
            dispatchTestCase={dispatchTestCase}
          />
        );
      case "assertion":
        return (
          <Assertion
            key={statement.id}
            id={statement.id}
            dispatchTestCase={dispatchTestCase}
          />
        );
      case "render":
        return (
          <Render
            key={statement.id}
            id={statement.id}
            dispatchTestCase={dispatchTestCase}
            props={statement.props}
          />
        );
      default:
        return;
    }
  });

  const testStyle = {
    padding: "5px"
  }

  return (
    <div>
      <TestMenu dispatchTestCase={dispatchTestCase} />
      <section style={testStyle}>
        <label htmlFor="test-statement">test:</label>
        <input
          type="text"
          id="test-statement"
          value={testCase.testStatement}
          onChange={handleUpdateTestStatement}
        />
      </section>
      <section style={testStyle}>
        <label htmlFor="mock-data-checkbox">Will you need mock data:</label>
        <input
          type="checkbox"
          id="mock-data-checkbox"
          disabled={mockDataJSX.length}
          onClick={handleToggleMockData}
        />
      </section>
      {mockData.mockDataCheckBox && (
        <section style={testStyle}>
          <label htmlFor="mock-data">Mock data</label>
          <FontAwesomeIcon
            id="mock-data"
            icon="plus"
            onClick={handleAddMockData}
          />
          {mockDataJSX}
        </section>
      )}
      <div>{statementsJSX}</div>
    </div>
  );
};

export default TestCase;

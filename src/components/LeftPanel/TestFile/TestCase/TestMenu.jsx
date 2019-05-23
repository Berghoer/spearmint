import React, { useReducer } from "react";
import { testCaseReducer, testCaseState } from "./testCaseReducer";
import { addAction } from "./testCaseActions";

const TestMenu = ({ dispatchTestCase }) => {
  const handleAddAction = e => {
    dispatchTestCase(addAction());
  };

  return (
    <div className="flex-container">
      <div id="left-menu">
        <button className="menu-btn">New Test</button>
      </div>
      <div id="right-menu">
        <button className="menu-btn" onClick={handleAddAction}>
          Action
        </button>
        <button className="menu-btn">Assertion</button>
        <button className="menu-btn">Render</button>
      </div>
    </div>
  );
};

export default TestMenu;

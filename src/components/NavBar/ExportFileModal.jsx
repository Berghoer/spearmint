import React, { useContext } from 'react';
import { testCaseContext } from '../../context/testCaseReducer';
import { mockDataContext } from '../../context/mockDataReducer';

const ExportFileModal = () => {
  const testCase = useContext(testCaseContext);
  const mockData = useContext(mockDataContext);
  console.log(testCase);
  return (
    <div>
    </div>
  );
};

export default ExportFileModal;
import React, { useContext } from 'react';
import { PuppeteerTestCaseContext } from '../../../context/puppeteerTestCaseReducer';
import PuppeteerTestMenu from '../TestMenu/PuppeteerTestMenu';
import PuppeteerTestStatements from './PuppeteerTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateStatementsOrder } from '../../../context/puppeteerTestCaseActions';

const PuppeteerTestCase = () => {
  const [{ puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(PuppeteerTestCaseContext);
  
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
      puppeteerStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToPuppeteerTestCase(updateStatementsOrder(reorderedStatements));
  };

  return (
    <div>
      <div id='head'>
        <PuppeteerTestMenu dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase}/>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable'>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <PuppeteerTestStatements
                  puppeteerStatements={puppeteerStatements}
                  dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase}
                />
                {provided.placeholder}
              </div>                        
            )}
          </Droppable>
      </DragDropContext>
    </div>
  )
}

export default PuppeteerTestCase;
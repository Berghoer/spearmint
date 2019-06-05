import React from 'react';
import FirstRender from './FirstRender';
import { Draggable } from 'react-beautiful-dnd';

const Rerender = ({ render, index, dispatchToTestCase }) => {
  return (
    <Draggable draggableId={render.id.toString()} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <FirstRender key={render.id} render={render} dispatchToTestCase={dispatchToTestCase} />
        </div>
      )}
    </Draggable>
  );
};

export default Rerender;

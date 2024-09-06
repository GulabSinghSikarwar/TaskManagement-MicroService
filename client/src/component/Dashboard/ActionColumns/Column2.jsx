import React, { useEffect } from 'react';
import Card from '../TaskCard';
import { Droppable } from 'react-beautiful-dnd';
import './columns.css';
import { FaPlus } from "react-icons/fa";
import TaskCreationModal from '../Utils/CreateTasks';


function Column2({ column, cards }) {
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "",
    width: "100%"

  });
 
  return (
    <div className="w-full md:w-1/4 lg:w-1/4 p-2">
      <div className=" flex justify-between text-columnHeadingColor p-4 items-center ">
        <div> {column.title}</div>
        <TaskCreationModal />
      </div>
      <Droppable droppableId={column.columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
            className=" column-body "
          >
            {cards && cards.length ? (
              cards.map((card, index) => (
                <Card key={card._id} card={card} index={index} />
              ))
            ) : (
              <div className="text-center p-4" key={"sss"} index={0}>No tasks in this column</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column2;

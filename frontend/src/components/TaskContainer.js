import Task from "./Task";
import timeStampToDate from "../helpers/TimeStampToDate";
import {ToastContainer} from "react-toastify";
import React from "react";

const TaskContainer = ({data, status, state}) => {
  return (
      <>
        <div className='tasks-container'>
          <div className='header-container'>
            <h2 className='task-header'>{state}</h2>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                closeButton={false}
            />
          </div>

          {
            data.filter(task => task.isDone === status).length === 0 ?

                <div className='task-container'>
                  <p>No tasks found</p>
                </div>

                :

                <>
                  {data.filter(task => task.isDone === status).map(
                      ({id, description, deadline, isDone, isForGrab, isGrabbed}) => (
                          <Task description={description}
                                deadline={deadline}
                                isDone={isDone}
                                timeStampToDate={() => timeStampToDate(deadline)}
                                status={status}
                                id={id}
                                isForGrab={isForGrab}
                                isGrabbed={isGrabbed}
                          />
                      ))}
                </>
          }
        </div>
      </>
  );
};

export default TaskContainer;

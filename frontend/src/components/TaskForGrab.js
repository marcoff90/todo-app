import Modal from "../components/Modal";
import React, {useState} from "react";
import {faHandPeace} from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import timeStampToDate from "../helpers/TimeStampToDate";
import {ToastContainer} from "react-toastify";

const TaskForGrab = ({data, header}) => {
  const [modalState, setModalState] = useState(false);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
      <>
        <div className='grab-container'>

          <div className='header-container'>
            <h2 className='task-header'>{header}</h2>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                closeButton={false}
            />
          </div>

          {
            data.length === 0 ?

                <div className='grab-task-container'>
                  <p>No tasks found</p>
                </div>
                :
                <>
                  {data.map(({id, description, deadline}) => (
                      <>
                        <Modal toggleModal={toggleModal}
                               modalState={modalState}
                               text={'Do you really want to grab this task?'}
                               buttonText={'Grab'}
                               title={description}
                               id={id}
                        />
                        <div className='grab-task-container'>
                          <p>{description}</p>

                          <div className='task-item'>
                            <p className='deadline'>Deadline:</p>
                            <p className='deadline'>{timeStampToDate(
                                deadline)}</p>
                          </div>

                          <div className='task-item'>
                            <IconButton className={'icon-complete'}
                                        icon={faHandPeace}
                                        onClick={toggleModal}/>
                          </div>

                        </div>
                      </>
                  ))}
                </>
          }
        </div>
      </>
  );
}
export default TaskForGrab;

import InputModal from "./InputModal";
import Modal from "./Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {useState} from "react";
import {
  faCircleCheck,
  faHandBackFist,
  faHandPeace,
  faPencil, faShareFromSquare, faTrash
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

const Task = ({
  timeStampToDate, description, deadline, isDone, id, isForGrab,
  isGrabbed
}) => {
  const [modalState, setModalState] = useState(false);
  const [inputModalState, setInputModalState] = useState(false);
  const [modalText, setModalText] = useState('');
  const [buttonText, setButtonText] = useState('');
  const toggleModal = () => {
    setModalState(!modalState);
  }
  const toggleInputModal = () => {
    setInputModalState(!inputModalState);
  }

  return (

      <>
        <InputModal toggleModal={toggleInputModal}
                    modalState={inputModalState}
                    title={description}
                    id={id}/>

        <Modal toggleModal={toggleModal}
               modalState={modalState}
               text={modalText}
               buttonText={buttonText}
               title={description}
               id={id}/>

        <div className='task-container'>

          <p>{description}</p>

          <div className='task-item'>
            <p className='deadline'>Deadline:</p>
            <p className='deadline'>{timeStampToDate(
                deadline)}</p>
            {isForGrab && <FontAwesomeIcon icon={faHandPeace}/>}
            {isGrabbed && <FontAwesomeIcon icon={faHandBackFist}/>}
          </div>

          <div className='task-icons'>

            {
              isDone ?
                  <>
                    <IconButton onClick={toggleInputModal}
                                className={'icon-edit'}
                                icon={faPencil}/>

                    <IconButton className={'icon-delete'}
                                icon={faTrash}
                                onClick={() => {
                                  toggleModal();
                                  setButtonText('Delete');
                                  setModalText(
                                      'Do you really want to delete this task?')
                                }}/>
                  </>
                  :
                  <>
                    <IconButton onClick={toggleInputModal}
                                className={'icon-edit'}
                                icon={faPencil}/>

                    <IconButton className={'icon-complete'}
                                icon={faCircleCheck}
                                onClick={() => {
                                  toggleModal();
                                  setButtonText('Complete');
                                  setModalText(
                                      'Do you really want to complete this task?')
                                }}/>
                    <IconButton className={'icon-share'}
                                icon={faShareFromSquare}
                                onClick={() => {
                                  toggleModal();
                                  setButtonText('Share');
                                  setModalText(
                                      'Do you really want to offer this task to others?')
                                }}/>
                    <IconButton className={'icon-delete'}
                                icon={faTrash}
                                onClick={() => {
                                  toggleModal();
                                  setButtonText('Delete');
                                  setModalText(
                                      'Do you really want to delete this task?')
                                }}/>
                  </>
            }
          </div>
        </div>
      </>
  );
};

export default Task;

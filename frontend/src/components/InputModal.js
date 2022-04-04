import Modal from "react-modal";
import Input from "./Input";
import React, {useState} from "react";
import modalStyle from "../assets/modal-style";
import RequestSender from "../services/RequestSender";
import {useNavigate} from "react-router-dom";

const InputModal = ({toggleModal, modalState, title, id}) => {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const navigate = useNavigate();

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  }
  const deadlineChangeHandler = (e) => {
    setDeadline(Math.floor(new Date(e.target.value).getTime() / 1000));
  }

  const getUpdatedTask = () => {
    return deadline === null ? {description} : {description, deadline}
  };

  return (
      <>
        <Modal
            isOpen={modalState}
            onRequestClose={toggleModal}
            style={modalStyle}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
          <div className='modal-container'>
            <h1 className="task-header">{title}</h1>

            <div className='input-signup'>

              <Input type="text"
                     placeholder="Description"
                     value={description}
                     onChange={descriptionChangeHandler}
              />

              <p className='modal-text'>DeadLine</p>

              <Input type="datetime-local"
                     placeholder="Deadline"
                     value={deadline}
                     onChange={deadlineChangeHandler}
              />

            </div>

          </div>
          <div className="modal-button-container">

            <div className='my-modal-button'
                 onClick={() => {
                   RequestSender.updateTask(id, getUpdatedTask(), navigate);
                   toggleModal()
                 }}>Edit
            </div>

            <div className='modal-close-button'
                 onClick={toggleModal}>Close
            </div>
          </div>
        </Modal>
      </>
  );
};

export default InputModal;

import React, {useState} from "react";
import {ToastContainer} from "react-toastify";
import Input from "../components/Input";
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";
import RequestSender from "../services/RequestSender";

const NewTask = () => {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const navigate = useNavigate();

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  }
  const deadlineChangeHandler = (e) => {
    setDeadline(Math.floor(new Date(e.target.value).getTime() / 1000));
  }

  return (
      <>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            closeButton={false}
        />
        <div className="d-flex justify-content-center py-1">
          <div className='row my-5'>
            <div className='col-6'>
              <div className='add-task-container'>

                <h2>Add Task</h2>

                <div className='input-signup'>

                  <Input type="text"
                         placeholder="Description"
                         value={description}
                         onChange={descriptionChangeHandler}
                  />
                  <Input type="datetime-local"
                         placeholder="Deadline"
                         value={deadline}
                         onChange={deadlineChangeHandler}
                  />
                </div>

                <div className='button-container'>
                  <Button content="Add Task"
                          className={'main'}
                          onClick={() => RequestSender.addTask(description,
                              deadline, navigate)}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default NewTask;

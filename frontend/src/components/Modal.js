import Modal from "react-modal";
import modalStyle from "../assets/modal-style";
import RequestSender from "../services/RequestSender";
import {useNavigate} from "react-router-dom";

const MyModal = ({toggleModal, modalState, title, buttonText, text, id}) => {
  let navigate = useNavigate();
  const request = () => {
    switch (buttonText) {
      case 'Complete' :
        return RequestSender.completeTask(id, navigate);
      case 'Share' :
        return RequestSender.offerForGrabs(id, navigate);
      case 'Delete':
        return RequestSender.deleteTask(id, navigate);
      case 'Grab' :
        return RequestSender.grabTask(id, navigate);
    }
  }

  return (
      <>
        <Modal
            isOpen={modalState}
            onRequestClose={toggleModal}
            style={modalStyle}
            contentLabel="Example Modal"
            ariaHideApp={false}>

          <div className='modal-container'>
            <h1 className="task-header">{title}</h1>
            <p className='modal-text'>{text}</p>
          </div>

          <div className="modal-button-container">

            <div className='my-modal-button' onClick={() => {
              request();
              toggleModal()
            }}>{buttonText}</div>

            <div className='modal-close-button' onClick={toggleModal}>Close
            </div>

          </div>
        </Modal>
      </>
  );
};

export default MyModal;

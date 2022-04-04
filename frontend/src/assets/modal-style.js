let width = window.innerWidth;

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: width < 768 ? '90vw' : '30rem',
    height: '20rem',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    background: 'linear-gradient(to right, #30CFD0 0%, #330867 100%)',
    border: '2px solid white'
  },
};

export default modalStyle;

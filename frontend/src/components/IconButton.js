import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const IconButton = ({onClick, className, icon}) => {
  return (
      <>
        <div className={className + ' icon-button'}
             onClick={onClick}>
          <FontAwesomeIcon icon={icon}/>
        </div>
      </>
  );
};

export default IconButton;

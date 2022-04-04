import React, {useState, useEffect} from "react";
import {Fade} from "react-awesome-reveal";

const logo = () => {
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [delay, setDelay] = useState(5000);
  useEffect(() => {
    setTimeout(() => {
      setLoadingLogo(true);
      setDelay(2500)
    }, 5000)
  }, [])

  return (
      <div className='loading-background'>
        <div className='loading-wrapper'>
          <Fade delay={1000}
                duration={delay}
                triggerOnce={true}
                reverse={loadingLogo}>
            <div className='d-flex justify-content-center align-items-center'>
              <h1 className='loading'>ToDo App</h1>
            </div>
          </Fade>
        </div>
      </div>
  );
};

export default logo;

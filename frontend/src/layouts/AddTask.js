import Navbar from "../components/Navbar";
import {Fade} from "react-awesome-reveal";
import NewTask from "../components/NewTask";
import {useEffect, useState} from "react";
import Auth from "../services/Auth";

const AddTask = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 100);
  })

  return (
      <>
        <div className="background">
          {
            loading ? <Auth/> :
                <>
                  <div className='task-view-container'>
                    <Navbar/>
                    <Fade duration={2000} delay={2500}>
                      <NewTask/>
                    </Fade>
                  </div>
                </>
          }
        </div>
      </>
  );
};

export default AddTask;

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Fade} from "react-awesome-reveal";
import TaskForGrab from "../components/TaskForGrab";

const GrabTask = () => {
  const [loading, setLoading] = useState(true);
  const {state} = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  })

  return (
      <>
        <div className="background">
          {
            loading ? <Loading request={'https://todo-my-api.herokuapp.com/api/tasks'} path={'/grab-a-task'}/> :
                <>
                  <div className='task-view-container'>
                    <Navbar setLoadingTasks={setLoading} loadingTasks={loading}/>
                    <Fade duration={2000} delay={2500}>
                      <TaskForGrab data={state.data} header={"DO SOMEONE ELSE'S TASK"}/>
                    </Fade>
                  </div>
                </>
          }
        </div>
      </>
  );
};

export default GrabTask;

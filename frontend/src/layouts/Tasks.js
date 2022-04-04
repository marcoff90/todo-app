import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import React, {useEffect, useState} from "react";
import TaskContainer from "../components/TaskContainer";
import {useLocation} from "react-router-dom";
import {Fade} from "react-awesome-reveal";

const Tasks = () => {
  const {state} = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  })
  return (
      <>
        <div className="background">

          {
            loading ? <Loading request={'https://todo-my-api.herokuapp.com/api/users/tasks'} path={'/my-tasks'}/> :
                <>
                  <div className='task-view-container'>
                    <Navbar setLoadingTasks={setLoading} loading={loading}/>
                    <Fade duration={2000} delay={2500}>
                      <TaskContainer data={state.data} status={false} state={'TODO'}/>
                      <TaskContainer data={state.data} status={true}
                                     state={'COMPLETED'}/>
                    </Fade>
                  </div>
                </>
          }
        </div>
      </>
  );
};

export default Tasks;

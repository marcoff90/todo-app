import React, {useState, useEffect} from "react";
import HashLoader from "react-spinners/HashLoader";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const loading = ({request, path}) => {
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (!dataLoaded) {
      axios.get(request, {
        headers: {
          "Authorization": `Bearer ${window.localStorage.getItem('token')}`
        }
      })
      .then(res => {
        navigate(path, {state: {data: res.data}});
        setDataLoaded(true)
      })
      .catch(error => {
        navigate('/');
      })
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, []);

  return (
      <>
        <div className='loading-wrapper'>
          <HashLoader color={"#FFFFFF"} loading={loading} size={80}/>
        </div>
      </>
  )
};

export default loading;

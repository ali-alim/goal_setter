import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner"
import {reset, getGoals} from "../features/goals/goalSlice"

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {goals, isError, isLoading, message} = useSelector((state) => state.goals) 


  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, dispatch, message]);

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
    </>
  );
}

export default Dashboard;

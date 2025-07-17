import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { logout } from "../../feature/auth/authSlice";
import { Navigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout())
  }, [dispatch, logout])
  return (
    <Navigate to='sign-in' />
  )
}
export default SignOut;
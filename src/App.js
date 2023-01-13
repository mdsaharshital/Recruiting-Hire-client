import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase.init";
import { useDispatch } from "react-redux";
import { getUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
        // ...
      } else {
      }
    });
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

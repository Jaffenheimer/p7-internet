import React, {useState} from "react";
import Pages from '../objects/Pages'
import ProfilePicture from "./ProfilePicture";
import NumberField from "./NumberField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";


const ContainerRight = () => {
	const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [loggedIn, setLoggedIn] = useState(loggedInUser.length === 1)

  function goToLoginPage() {
    dispatch(pageActions.goToPage(Pages.loginPage));
  }

  return (
    <div className="ContainerRight">
      <div>
        <Toaster />
      </div>
      <div className="ContainerRightTop">
        <div className="ContainerRightColumn">
          <p id="NumberPersons">Personer</p>
        </div>
        <div className="ContainerRightColumn">
          <NumberField />
        </div>
        <div className="ContainerRightColumn">
          {loggedIn ? <ProfilePicture /> : <button onClick={goToLoginPage}>Log In</button>}
        </div>
      </div>
      <div className="ContainerRightMiddle">
        <DietaryRestrictions />
      </div>
      <div className="ContainerRightBottom">
        <ExcludeList />
      </div>
    </div>
  );
};

export default ContainerRight;

import React, {useState} from "react";
import Pages from '../objects/Pages'
import ProfilePicture from "./ProfilePicture";
import NumberField from "./NumberField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Allergens from "./Allergens";


const ContainerRight = () => {
	const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [loggedIn, setLoggedIn] = useState(false)

  function goToLoginPage() {
    dispatch(pageActions.goToPage(Pages.loginPage));
  }

	function SetLoggedInOnChange(){ //component that dynamically changes when log in status changes
		if (loggedInUser.length === 1)
		  setLoggedIn(true)
		else
			setLoggedIn(false)
	}

  return (
    <div className="ContainerRight">
      <div>
        <Toaster />
      </div>
      <div className="ContainerRightTop">
        <div className="ContainerRightColumn">
          <h3 id="NumberPersonsText">Personer</h3>
        </div>
        <div className="ContainerRightColumn">
          <NumberField />
        </div>
        <div className="ContainerRightColumn">
					<SetLoggedInOnChange/>
          {loggedIn ? <ProfilePicture /> : <button onClick={goToLoginPage}>Log In</button>}
        </div>
      </div>
      <div className="ContainerRightMiddle">
        <DietaryRestrictions />
        <Allergens />
      </div>
      <div className="ContainerRightBottom">
        <ExcludeList />
      </div>
    </div>
  );
};

export default ContainerRight;

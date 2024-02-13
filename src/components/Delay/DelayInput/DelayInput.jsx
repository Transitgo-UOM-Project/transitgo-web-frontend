import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import "./DelayInput.css";

const DelayInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const delayInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

    const [showRules, setShowRules] = useState(false);
  
    const toggleRules = () => {
      setShowRules(!showRules);
    };

  return (
    <div >
      
      <div className="on">
      <Button  onClick={toggleRules} >
        + Announcement/Delay
      </Button>
      </div>
     

      {showRules ? (
        <div>
          <form onSubmit={formSubmitHandler}>
            <div className={`form-control ${!isValid ? "invalid" : ""}`}>
              <textarea type="text" onChange={delayInputChangeHandler} />
            </div>
            <Button type="submit">Submit Post</Button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default DelayInput;

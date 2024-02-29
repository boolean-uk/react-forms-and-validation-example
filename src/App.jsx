import { useState } from "react";
import FormInputErrors from "./FormInputErrors";

import "./App.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  gender: "other",
  terms: false,
  password: "",
};

const validateMinimumLength = (value, minLength) => value.length >= minLength;

function App() {
  const [userData, setUserData] = useState(initialFormData);

  const [formChanged, setFormChanged] = useState({
    firstName: false,
    password: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    setUserData(initialFormData);
  };

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    if (name !== undefined) {
      if (type === "checkbox") {
        setUserData({ ...userData, [name]: checked });
      } else {
        setUserData({ ...userData, [name]: value });
        setFormChanged({ ...formChanged, [name]: true });
      }
    }
  };

  const validateForm = () => {
    const errors = {
      nameError: [],
      passwordError: [],
      hasErrors: false,
    };
    if (!validateMinimumLength(userData.firstName, 3)) {
      errors.nameError.push("Name must be at least 3 characters long");
      errors.hasErrors = true;
    }

    if (!validateMinimumLength(userData.password, 8)) {
      errors.passwordError.push(
        "Password must be at least 8 characters long"
      );
      errors.hasErrors = true;
    }
    return errors;
  };

  const formErrors = validateForm();

  return (
    <div>
      <form className="form-stack" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            onChange={handleChange}
            value={userData.firstName}
          />
          {formErrors.nameError.length > 0 && formChanged.firstName && (
            <FormInputErrors errors={formErrors.nameError} />
          )}
        </div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          onChange={handleChange}
          value={userData.lastName}
        />
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={userData.password}
          />
          {formErrors.passwordError.length > 0 && formChanged.password && (
            <FormInputErrors errors={formErrors.passwordError} />
          )}
        </div>
        <div>
          <input
            id="female"
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
            checked={userData.gender === "female"}
          />
          <label htmlFor="female">Female</label>
          <input
            id="male"
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
            checked={userData.gender === "male"}
          />
          <label htmlFor="male">Male</label>
          <input
            id="other"
            type="radio"
            name="gender"
            value="other"
            onChange={handleChange}
            checked={userData.gender === "other"}
          />
          <label htmlFor="other">Other</label>
        </div>
        <div>
          <input
            id="terms"
            type="checkbox"
            name="terms"
            onChange={handleChange}
            checked={userData.terms}
          />
          <label htmlFor="terms">I accept the Terms and Conditions</label>
        </div>

        <button type="submit" disabled={formErrors.hasErrors}>
          Submit!
        </button>
      </form>
    </div>
  );
}

export default App;

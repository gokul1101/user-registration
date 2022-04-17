import React, { useState } from "react";
import "./Register.css";
import IDCard from "../../images/id-card.png";
import Mail from "../../images/mail.png";
import Avatar from "../../images/avatar.png";
import helperService from "../../apis/helperService";
const Register = ({ showAlert, socket }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (firstName === "") {
      showAlert("First name field is empty.", "danger");
      return;
    }
    if (firstName.length < 3) {
      showAlert("First name should have more than 3 letters.", "danger");
      return;
    }
    if (lastName === "") {
      showAlert("Last name field is empty.", "danger");
      return;
    }
    if (email === "") {
      showAlert("Email field is empty.", "danger");
      return;
    }
    if (!emailRegex.test(email)) {
      showAlert("Invalid email ID.", "danger");
      return;
    }
    try {
      const { status, newUser } = await helperService.createUser({
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        email: email.trim(),
      });
      if (status === 201) {
        showAlert("Registered Successfully.", "success");
        socket.emit("new", newUser);
      }
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch ({ message = "Error in registration" }) {
      showAlert(message, "danger");
    }
  };

  return (
    <div className="register w-50 mt-5 ml-md-2 p-md-3">
      <div className="registration-form w-100 h-100 position-relative d-flex flex-column px-md-3 pt-2 mt-5 mt-lg-0">
        <div className="illustration-box position-absolute">
          <img src={Avatar} alt="avatar" width="100%" height="100%" />
        </div>
        <div className="header mt-3">
          <h1 className="font-weight-bolder">Registration Form</h1>
        </div>
        <form
          method="POST"
          className="d-flex flex-column position-relative w-100 mt-2"
          onSubmit={(e) => createUser(e)}
        >
          <div className="d-flex flex-column w-100 first-name my-2">
            <label className="font-weight-bold ml-1" htmlFor="firstname">
              First Name
            </label>
            <div className="position-relative">
              <img
                className="input-icon position-absolute"
                src={IDCard}
                alt="firstname"
                width="30px"
                height="30px"
              />
              <input
                className="w-100 pl-5 pr-3 py-2"
                type="text"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column w-100 last-name my-2">
            <label className="font-weight-bold ml-1" htmlFor="lastname">
              Last Name
            </label>
            <div className="position-relative">
              <img
                className="input-icon position-absolute"
                src={IDCard}
                alt="lastname"
                width="30px"
                height="30px"
              />
              <input
                className="w-100 pl-5 pr-3 py-2"
                type="text"
                name="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column email my-2">
            <label className="font-weight-bold ml-1" htmlFor="email">
              Email
            </label>
            <div className="position-relative">
              <img
                className="input-icon position-absolute"
                src={Mail}
                alt="email"
                width="28px"
                height="28px"
              />
              <input
                className="pl-5 pr-1 py-2 w-100"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="register-button position-relative mt-4">
            <button className="btn position-absolute" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from "react";
import IDCard from "../../images/id-card.png";
import Mail from "../../images/mail.png";
import Delete from "../../images/delete.png";
import Deadline from "../../images/deadline.png";
import Empty from "../../images/empty.svg";
import helperService from "../../apis/helperService";
import "./Main.css";
import Canvas from "./Canvas/Canvas";
const Main = ({ showAlert }) => {
  const [users, setUsers] = useState([]);
  const [canvaImage, setCanvaImage] = useState(null);
  const [pickColor, setPickColor] = useState("black");
  const [isPen, setIsPen] = useState(false);
  const fetchUsers = async () => {
    try {
      const { status, message, users } = await helperService.getAllUsers();
      if (status === 200) {
        setUsers(users);
        showAlert(message, "success");
      }
    } catch ({ message = "Error in getting users." }) {
      showAlert(message, "danger");
    }
  };
  const deleteUser = async (id) => {
    try {
      const { status, message } = await helperService.deleteUser({ id });
      if (status === 202) {
        let filteredUsers = users.filter((user) => user._id !== id);
        setUsers(filteredUsers);
        showAlert(message, "success");
      }
    } catch ({ message = "Error in deleting user." }) {
      showAlert(message, "danger");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="result bg-light w-100 h-100 d-flex ml-2">
      <div className="list-users p-md-3 p-2">
        {users.length !== 0 ? (
          <>
            <div className="header">
              <h1 className="font-weight-bolder">List of users</h1>
            </div>
            <div className="d-flex flex-wrap">
              {users.map((user) => {
                return (
                  <div
                    className="user-card w-100 bg-white position-relative d-flex flex-column px-md-4 p-2 ml-2 my-2"
                    key={user._id}
                  >
                    <div
                      className="delete-icon position-absolute"
                      onClick={(e) => deleteUser(user._id)}
                    >
                      <img
                        src={Delete}
                        alt="delete"
                        width="25px"
                        height="25px"
                      />
                    </div>
                    <p className="m-0 my-1 d-flex align-items-center">
                      <img
                        src={IDCard}
                        className="mr-2"
                        alt="fullname"
                        width="20px"
                        height="20px"
                      />
                      <strong>{`${user.firstname} ${user.lastname}`}</strong>
                    </p>
                    <p className="m-0 my-1 d-flex align-items-center">
                      <img
                        src={Mail}
                        className="mr-2"
                        alt="mail"
                        width="20px"
                        height="20px"
                      />
                      <strong>{`${user.email}`}</strong>
                    </p>
                    <span className="m-0 my-1 d-flex align-items-center">
                      <img
                        src={Deadline}
                        className="mr-2"
                        alt="deadline"
                        width="20px"
                        height="20px"
                      />
                      <strong>
                        {new Date(user?.created_at).toLocaleString()}
                      </strong>
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="empty-div h-50 d-flex flex-column align-items-center justify-content-center">
            <div className="header">
              <h1 className="font-weight-bolder">No users registered</h1>
            </div>
            <img
              src={Empty}
              alt="empty"
              className="img-fluid"
              height="250px"
              width={"250px"}
            />
          </div>
        )}
      </div>
      <Canvas
        canvaImage={canvaImage}
        setCanvaImage={setCanvaImage}
        pickColor={pickColor}
        setPickColor={setPickColor}
        isPen={isPen}
        setIsPen={setIsPen}
      />
    </div>
  );
};

export default Main;

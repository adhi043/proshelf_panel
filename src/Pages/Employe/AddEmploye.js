import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import MapContext from "../../Components/MapContext";
import toast from "react-simple-toasts";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import Swal from "sweetalert2";

const AddEmploye = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [cofirmPassword, setConfirmPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const submit = () => {
    if (!firstName) {
      toast("🚨 Must enter first name!");
    } 
    else if (!lastName) {
      toast("🚨 Must enter last name!");
    } 
    else if (!username) {
      toast("🚨 Must enter user name!");
    } 
    else if (!email) {
      toast("🚨 Must enter email!");
    } else if (!phone) {
      toast("🚨 Must enter phone!");
    } else if (!password) {
      toast("🚨 Must enter password!");
    } else if (!cofirmPassword) {
      toast("🚨 Must enter confirm password!");
    } else if (cofirmPassword !== password) {
      toast("🚨 Password and confirm password must be same!");
    } else {
      try {
        const param = new FormData();
        param.append("username", username);
        param.append("firstName", firstName);
        param.append("lastName", lastName);
        param.append("email", email);
        param.append("phone", phone);
        param.append("password", password);

        axios
          .post(`${BaseUrl.baseUrl}/employe/create`, param)
          .then((res) => {
            if (res.data.status === "ok") {
              toast("🎉 Created Successfully!");
              navigate("/team");
            } else if (res.data.status === "fail") {
              toast("🚩" + res.data.message);
            }
          })
          .catch((err) => {
            toast("🚨" + err.message);
          });
      } catch (err) {
        toast("🚨 Something went wrong!");
      }
    }
  };

  return (
    <div>
      <div>
        <Header name={"Employe"} />
      </div>

      <div className="bg-light rounded-3 p-3  mb-4 me-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3>Add Team</h3>
          {/* <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{cursor:'pointer'}} onClick={()=>{navigate('/addcompany')}}>
                        <h5 className='m-0 p-0'>Add</h5>
                    </div> */}
        </div>

        <div className="row  w-100">
          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="text"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter User Name"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="text"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="text"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="email"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="tel"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter Your Phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="password"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="password"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter Your Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow"
          style={{ cursor: "pointer", width: "140px" }}
          onClick={() => {
            submit();
          }}
        >
          <h5 className="m-0 p-0">Submit</h5>
        </div>
      </div>
    </div>
  );
};

export default AddEmploye;

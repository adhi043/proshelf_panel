import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate, useParams } from "react-router-dom";
import MapContext from "../../Components/MapContext";
import toast from "react-simple-toasts";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import Swal from "sweetalert2";

const EditEmploye = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [cofirmPassword, setConfirmPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const [data, setData] = useState({});

  useEffect(() => {
    try {
      axios
        .get(`${BaseUrl.baseUrl}/employe/get/${id}`)
        .then((res) => {
          if (res.data.status === "ok") {
            setData(res.data.data);
            setFirstName(res.data.data.firstName);
            setLastName(res.data.data.lastName);
            setEmail(res.data.data.email);
            setPhone(res.data.data.phone);
            setPassword(res.data.data.password);
            setUsername(res.data.data.username);
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
  }, []);

  const submit = () => {
    try {
      const param = new FormData();
      if (username !== data?.userame) {
        param.append("username", username);
      }
      if (firstName !== data?.firstName) {
        param.append("firstName", firstName);
      }
      if (lastName !== data?.lastName) {
        param.append("lastName", lastName);
      }
      if (email !== data?.email) {
        param.append("email", email);
      }
      if (phone !== data?.phone) {
        param.append("phone", phone);
      }
      if (password !== data?.password) {
        param.append("password", password);
      }

      axios
        .put(`${BaseUrl.baseUrl}/employe/update/${id}`, param)
        .then((res) => {
          if (res.data.status === "ok") {
            toast("🎉 Updated Successfully!");
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
  };

  return (
    <div>
      <div>
        <Header name={"Team"} />
      </div>

      <div className="bg-light rounded-3 p-3  mb-4 me-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3>Edit Team</h3>
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
                defaultValue={username}
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
                defaultValue={firstName}
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
                defaultValue={lastName}
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
                defaultValue={email}
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
                defaultValue={phone}
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
                defaultValue={password}
                onChange={(e) => {
                  setPassword(e.target.value);
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

export default EditEmploye;

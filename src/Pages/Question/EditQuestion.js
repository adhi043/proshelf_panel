import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate, useParams } from "react-router-dom";
import MapContext from "../../Components/MapContext";
import toast from "react-simple-toasts";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import Swal from "sweetalert2";

const EditQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${BaseUrl.baseUrl}/company/get`)
        .then((res) => {
          if (res.data.status === "ok") {
            setNewData(res.data.data);
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

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [about, setAbout] = useState(null);

  const [data, setData] = useState({});

  useEffect(() => {
    try {
      axios
        .get(`${BaseUrl.baseUrl}/product/get/${id}`)
        .then((res) => {
          if (res.data.status === "ok") {
            setData(res.data.data);
            setName(res.data.data.name);
            setCompanyId(res.data.data.companyId?._id);
            setAbout(res.data.data.about);
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
      if (image) {
        param.append("image", image);
      }
      if (name !== data?.name) {
        param.append("name", name);
      }
      if (about !== data?.about) {
        param.append("about", about);
      }

      axios
        .put(`${BaseUrl.baseUrl}/product/update/${id}`, param)
        .then((res) => {
          if (res.data.status === "ok") {
            toast("🎉 Updated Successfully!");
            navigate("/product");
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
        <Header name={"Company"} />
      </div>

      <div className="bg-light rounded-3 p-3  mb-4 me-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3>Edit Product</h3>
          {/* <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{cursor:'pointer'}} onClick={()=>{navigate('/addcompany')}}>
                        <h5 className='m-0 p-0'>Add</h5>
                    </div> */}
        </div>

        <div className="row  w-100">
          <div className="col-md-12 mb-4">
            <div className="d-flex align-items-center px-3 position-relative">
              <img
                src={image ? URL?.createObjectURL(image) : data?.image}
                className="border"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: 200,
                }}
              />
              {image ? (
                <div
                  className={`d-flex justify-content-center align-items-center bg-${
                    image ? "danger" : "warning"
                  } position-absolute`}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: 200,
                    top: "10px",
                    left: "5px",
                  }}
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  <i className={`bi bi-x fs-4 text-white`}></i>
                </div>
              ) : (
                <div
                  className={`d-flex justify-content-center align-items-center bg-${
                    image ? "danger" : "warning"
                  } position-absolute`}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: 200,
                    top: "10px",
                    left: "5px",
                  }}
                >
                  <i className={`bi bi-pencil fs-6`}></i>
                </div>
              )}
              {image ? null : (
                <input
                  type="file"
                  className="border rounded-3 p-2 px-3 position-absolute"
                  placeholder="Enter Logo"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: 200,
                    opacity: 0,
                  }}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              )}
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="text"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter Product Name"
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-12 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3 h-auto">
              <i className="bi bi-pencil"></i>
              <textarea
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter about Product"
                defaultValue={about}
                onChange={(e) => {
                  setAbout(e.target.value);
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

export default EditQuestion;

import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import MapContext from "../../Components/MapContext";
import toast from "react-simple-toasts";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import Swal from "sweetalert2";

const AddReports = () => {
  const navigate = useNavigate();

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

  const submit = () => {
    if (!name) {
      toast("🚨 Must enter product name!");
    } else if (!image) {
      toast("🚨 Must select company logo image!");
    } else if (!companyId) {
      toast("🚨 Must select company!");
    } else if (!about) {
      toast("🚨 Must enter about product!");
    } else {
      try {
        const param = new FormData();
        param.append("image", image);
        param.append("name", name);
        param.append("about", about);
        param.append("companyId", companyId);

        axios
          .post(`${BaseUrl.baseUrl}/product/create`, param)
          .then((res) => {
            if (res.data.status === "ok") {
              toast("🎉 Created Successfully!");
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
    }
  };

  return (
    <div>
      <div>
        <Header name={"Product"} />
      </div>

      <div className="bg-light rounded-3 p-3  mb-4 me-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3>Add Product</h3>
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
                placeholder="Enter Product Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <i className="bi bi-pencil"></i>
              <input
                type="file"
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter Image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setCompanyId(e.target.value);
                }}
              >
                <option selected>Select Company</option>
                {newData?.length > 0 ? (
                  newData.map((i) => {
                    return (
                      <>
                        <option value={i?._id}>{i?.companyName}</option>
                      </>
                    );
                  })
                ) : (
                  <p>No data found!</p>
                )}
              </select>
            </div>
          </div>

          <div className="col-md-12 mb-4">
            <div className="border border-dark rounded-3 bg-white d-flex align-items-center px-3 h-auto">
              <i className="bi bi-pencil"></i>
              <textarea
                className="border-0 rounded-3 p-2 w-100 px-3"
                placeholder="Enter about Product"
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

export default AddReports;

import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import toast from "react-simple-toasts";
import Swal from "sweetalert2";

const SubQuestion = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${BaseUrl.baseUrl}/product/get`)
        .then((res) => {
          if (res.data.status === "ok") {
            setData(res.data.data);
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

  const del = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`${BaseUrl.baseUrl}/product/delete/${id}`)
            .then((res) => {
              if (res.data.status === "ok") {
                toast("🎉 Deleted Successfully!");

                axios
                  .get(`${BaseUrl.baseUrl}/product/get`)
                  .then((res) => {
                    if (res.data.status === "ok") {
                      setData(res.data.data);
                    } else if (res.data.status === "fail") {
                      toast("🚩" + res.data.message);
                    }
                  })
                  .catch((err) => {
                    toast("🚨" + err.message);
                  });
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
    });
  };

  return (
    <div>
      <div>
        <Header name={"Sub Question"} />
      </div>

      <div className="bg-light rounded-3 p-3  mb-4 me-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3>Sub Question</h3>
          <div
            className="p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/addsubQuestion");
            }}
          >
            <h5 className="m-0 p-0">Add</h5>
          </div>
        </div>

        <div className="border border-dark rounded-3 p-3 w-100">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>

              <tr>
                          <td>1</td>
                          <td>Name</td>
                          <td>Company</td>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <button
                              title="Edit"
                                className="btn btn-outline-info btn-sm"
                                onClick={() => {
                                  navigate(`/editproduct/`);
                                }}
                              >
                                <i className="bi bi-pencil fs-6"></i>
                              </button>
                              <button
                              title="Delete"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                  del();
                                }}
                              >
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>

                {data?.length > 0 ? (
                  data?.map((i,index) => {
                    return (
                      <>
                        <tr>
                          <td>{index}</td>
                          <td>{i?.name}</td>
                          <td>{i?.type}</td>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <button
                                className="btn btn-outline-info btn-sm"
                                onClick={() => {
                                  navigate(`/editproduct/${i?._id}`);
                                }}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                  del(i?._id);
                                }}
                              >
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <p>No data found!</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubQuestion;

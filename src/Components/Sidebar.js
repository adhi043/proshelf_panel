import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (route) => location.pathname.includes(route);

  const navigate = useNavigate();

  return (
    <div
      className="bg-light py-3 pe-3"
      style={{ height: "100vh", width: "220px", overflowY: "scroll" }}
    >
      <div className="p-3 mb-2 d-flex justify-content-center align-items-center">
        <img
          src={require("../Assests/logo.png")}
          alt="logo"
          style={{ width: "110px", height: "80px", objectFit: "contain" }}
        />
      </div>

      <div
        className={`${
          isActive("/home")
            ? "bg-warning border border-start-0 border-dark set-border set-shadow"
            : ""
        } p-3 d-flex my-2  align-items-center rounded-3 gap-2 `}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/home");
        }}
      >
        <i className="bi bi-ui-checks-grid"></i>
        <h6>Dashboard</h6>
      </div>

      <div
        className={`${
          isActive("/team")
            ? "bg-warning border border-start-0 border-dark set-border set-shadow"
            : ""
        } p-3 d-flex my-3  align-items-center rounded-3 gap-2 `}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/team");
        }}
      >
        <i className="bi bi-people-fill"></i>
        <h6>Team</h6>
      </div>

      <div
        className={`${
          isActive("/brand")
            ? "bg-warning border border-start-0 border-dark set-border set-shadow"
            : ""
        } p-3 d-flex  my-3 align-items-center rounded-3 gap-2 `}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/brand");
        }}
      >
        <i className="bi bi-people-fill"></i>
        <h6>Brand</h6>
      </div>

      <div
        className={`${
          isActive("/company")
            ? "bg-warning border border-start-0 border-dark set-border set-shadow"
            : ""
        } p-3 d-flex my-3  align-items-center rounded-3 gap-2 `}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/company");
        }}
      >
        <i className="bi bi-building-fill"></i>
        <h6>Company</h6>
      </div>

      <div
        className={`${
          isActive("/product")
            ? "bg-warning border border-start-0 border-dark set-border set-shadow"
            : ""
        } p-3 d-flex my-3  align-items-center rounded-3 gap-2 `}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/product");
        }}
      >
        <i className="bi bi-boxes"></i>
        <h6>Product</h6>
      </div>
      <div
        className={`${
          isActive("/tasks")
            ? "bg-warning border border-start-0 border-dark set-border set-shadow"
            : ""
        } p-3 d-flex my-3  align-items-center rounded-3 gap-2 `}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/tasks");
        }}
      >
        <i className="bi bi-boxes"></i>
        <h6>Tasks </h6>
      </div>
      <div
        className={`${
          isActive("/reports")
            ? "bg-warning border border-start-0 border-dark set-border set-shadow"
            : ""
        } p-3 d-flex my-3 align-items-center rounded-3 gap-2 `}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/reports");
        }}
      >
        <i className="bi bi-boxes"></i>
        <h6>Reports</h6>
      </div>
      <div
        className={`${
          isActive("/performances")
            ? "bg-warning border border-start-0 border-dark set-border set-shadow"
            : ""
        } p-3 d-flex my-3  align-items-center rounded-3 gap-2 `}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/performances");
        }}
      >
        <i className="bi bi-boxes"></i>
        <h6>Performances</h6>
      </div>
      
    </div>
  );
};

export default Sidebar;

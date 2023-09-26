import React from "react";
import homemain from "../assets/mainpage.png";
import { useNavigate } from "react-router-dom";
import "../style/_custom.css";
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column-reverse align-items-center my-4 py-4">
      <div className="text-center">
        <h2>Your Comprehensive Notes Managment Solution</h2>
        <p className="fs-5">Keep your notes organized and save in one place</p>
        <button onClick={() => navigate("/login")} className="btn btn-warning">
          Try Now
        </button>
      </div>
      <div>
        <img src={homemain} alt="" className="max-vw-90" />
      </div>
    </div>
  );
}

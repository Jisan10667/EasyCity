import DarkButton from "../../../components/darkButton/DarkButton";
import backendURL from "../../../lib/backendURL";

import { Input, InputNumber, Space, message } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import "./AddNewVehicle.css";

export default function AddNewSTSForm() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [newVehicleInfo, setNewVehicleInfo] = useState({
    stsID: "",
    wardNumber: "",
    capacity: "",
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    const fetchVehicleList = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/sts/all-sts`, {
          withCredentials: true,
        });
        // Assuming the STS IDs are sequential and numeric
        const nextSTSId = data.sts.length + 1;
        setNewVehicleInfo((prevInfo) => ({
          ...prevInfo,
          vehicleID: nextSTSId.toString(), // Convert to string if your ID is expected as a string
        }));
      } catch (error) {
        console.error("Failed to fetch STS list:", error);
        message.error("Failed to fetch STS list.");
      }
    };

    fetchVehicleList();
  }, []);

  const handleChange = (e) => {
    if (
      (e.target.name === "stsID" ||
        e.target.name === "wardNumber" ||
        e.target.name === "capacity") &&
      !(
        typeof Number(e.target.value) === "number" &&
        !Number.isNaN(Number(e.target.value))
      )
    )
      return;
    setNewVehicleInfo({ ...newVehicleInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    e.preventDefault();
    if (!newVehicleInfo.wardNumber) message.error("Please fill up WardNumber");
    else if (!newVehicleInfo.capacity)
      message.error("Please fill up the amount of capacity");
    else if (!newVehicleInfo.latitude) message.error("Enter the latitude of STS");
    else if (!newVehicleInfo.longitude) message.error("Enter the longitude of STS");
    else {
      //message.error(JSON.stringify(firmInfoFinal));
      try {
        const response = await axios.post(
          backendURL + "/sts/add-sts",
          newVehicleInfo,
          {
            // headers: { Authorization: localStorage.getItem("token") },
            withCredentials: true,
          }
        );
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/VehicleList");
        }, 2000);
        console.log(response.data);
        message.success("Vehicle added successfully");
      } catch (error) {
        console.log(error);
        message.error(error);
      }
      navigate("/VehicleList", {
        state: {
          uid: 1,
        },
      });
    }
  };

  return (
    <div>
      {showSuccess && (
        <div className="success-message">Vehicle added successfully</div>
      )}
      <form className="add-new-firm-form" onSubmit={handleSubmit}>
        <div className="addfirm-main-form">
          <div className="addfirm-form-left">
            <div className="addfirm-form-row">
              <Space direction="horizontal">
                <label htmlFor="name" className="addfirm-form-label">
                  STS ID&nbsp;
                </label>
                <Input
                  size="large"
                  className="addfirm-form-input"
                  id="stsID"
                  name="stsID"
                  value={newVehicleInfo.stsID}
                  readOnly
                />
              </Space>
            </div>

            <div className="addfirm-form-row">
              <Space direction="horizontal">
                <label htmlFor="name" className="addfirm-form-label">
                  Ward number &nbsp;
                </label>
                <Input
                  size="large"
                  placeholder="Enter Ward number"
                  className="addfirm-form-input"
                  id="wardNumber"
                  name="wardNumber"
                  value={newVehicleInfo.wardNumber}
                  onChange={handleChange}
                />
              </Space>
            </div>

            <div className="addfirm-form-row">
              <Space direction="horizontal">
                <label htmlFor="password" className="addfirm-form-label">
                  Capacity &nbsp;
                </label>
                <Input
                  size="large"
                  placeholder="Enter Capacity"
                  className="addfirm-form-input"
                  id="capacity"
                  name="capacity"
                  value={newVehicleInfo.capacity}
                  onChange={handleChange}
                />
              </Space>
            </div>

            <div className="addfirm-form-row">
              <Space direction="horizontal">
                <label htmlFor="password" className="addfirm-form-label">
                  Latitude &nbsp;
                </label>
                <Input
                  size="large"
                  placeholder="Enter the Latitude"
                  className="addfirm-form-input"
                  id="latitude"
                  name="latitude"
                  value={newVehicleInfo.latitude}
                  onChange={handleChange}
                />
              </Space>
            </div>
          </div>

          <div className="addfirm-form-right">
            <div className="addfirm-form-row">
              <Space direction="horizontal">
                <label htmlFor="name" className="addfirm-form-label">
                  Enter the Longitude
                </label>
                <Input
                  size="large"
                  placeholder="Enter the Longitude"
                  className="addfirm-form-input"
                  id="longitude"
                  name="longitude"
                  value={newVehicleInfo.longitude}
                  onChange={handleChange}
                />
              </Space>
            </div>
          </div>
        </div>
        <div className="registerbtn">
          <DarkButton
            buttonText="Save"
            onClick={() => {
              handleSubmit;
            }}
            routePath="forbidden"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

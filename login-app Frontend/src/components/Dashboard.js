import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarcodeUrl = async () => {
      try {
        const response = await fetch(
          "https://localhost:7274/api/Registration/generatetoken"
        );
        const barcodeUrl = await response.text();
        setBarcodeUrl(barcodeUrl);
      } catch (error) {
        console.error("Error fetching barcode URL:", error);
      }
    };

    fetchBarcodeUrl();
  }, []);

  const renderBarcode = () => {
    return (
      <img src={barcodeUrl} alt="Barcode" onClick={() => window.print()} />
    );
  };

  const handleInputChange = (event) => {
    setPin(event.target.value);
  };


  const handleButtonClick = async () => {
    try {
      const response = await fetch(
        "https://localhost:7274/api/Registration/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pin,
          }),
        }
      );
      const resText = await response.text();
      //const res = await response.json();
      if (resText === "Success") 
      {
        navigate("/home");
      } 
      else 
      {
        alert("Two Factor Authentication Failed");
      }
    } catch (error) {
      console.error("Error fetching barcode URL:", error);
    }
  };


  return (
    <div>
      <h2>Two Factor Authentication</h2>
      <div>
        <h3>Scan the Barcode for OTP</h3>
        {barcodeUrl ? renderBarcode() : "Loading barcode..."}
      </div>
      <div>
        <input
          type="number"
          value={pin}
          onChange={handleInputChange}
          placeholder="Enter OTP"
        />
        <button onClick={handleButtonClick}>Validate OTP</button>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./components/Login.css";
import Dashboard from "./components/Dashboard";
import $ from "jquery";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [data, setData] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const registration = {
      Username: username,
      Password: password,
    };

    $.ajax({
      url: "https://localhost:7274/api/Registration/login", // The URL of your web API endpoint
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(registration),
      success: function (response) {
        //console.log(response); // You can handle the response here
        // Call Dashboard component after successful login

        if (response === "Valid User") {
          //setData(response);
          console.log(response);
          
          //navigate("/dashboard");
          //navigate("/Dashboard", { state: { data } });
          //navigate("/dashboard/" + encodeURIComponent(data));
          //let s=response;
          //console.log(s);
          //navigate("Dashboard", { s });
          //navigate("Dashboard", { state: { s } });
          //alert(response);
          //navigate("/Dashboard", { state: { data: response } });
          //navigate("/Dashboard", { state: { data: response }, response });
          //<Dashboard props={s} />;
          navigate("/Dashboard");
        } else {
          alert("Invalid Credential");
        }
      },
      error: function (error) {
        console.error(error); // You can handle the error here
        alert("System Error");
      },
    });
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

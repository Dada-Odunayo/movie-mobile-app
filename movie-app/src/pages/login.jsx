import React, { useState } from "react";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState();
  let navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    const url = `https://qag4ih5s2h.execute-api.us-east-1.amazonaws.com/dev/login`;
    axios
      .post(url, {
        username: email,
        password: pwd
      })
      .then(function(response) {
        console.log(response);

        if (response.data.responsecode === "00") {
          setMsg("Login Successful");
          setInterval(() => {
            navigate("../movielist", { replace: true });
          }, 1000);
        }
        if (response.data.responsecode !== "00") {
          setMsg(response.data.responsemessage);
        }
      });
  };
  return (
    <>
      <div className={styles.page}>
        <h1 className={styles.header}>Login</h1>
        {msg && <h3 className={styles.error}>{msg}</h3>}
        <div className={styles.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} name="password" id="password" />
          </div>
          <div>
            <button className={styles.submit} type="submit" onClick={handleLogin}>
              Submit
            </button>
          </div>
        </div>
        <div>
          <h3>
            New User? Click Here to <Link to="/">Register</Link>
          </h3>
        </div>
      </div>
    </>
  );
}

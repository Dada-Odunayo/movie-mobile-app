import React, { useState } from "react";
import styles from "./register.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [type, setType] = useState("");
  const [msg, setMsg] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const url = `https://qag4ih5s2h.execute-api.us-east-1.amazonaws.com/dev/user/create-user`;
    axios
      .post(url, {
        email: email,
        firstname: fname,
        lastname: lname,
        mobilenumber: phone,
        password: pwd,
        address: addr,
        usertype: type
      })
      .then(function(response) {
        console.log(response);
        console.log(response.data.responsecode);
        console.log(response.data.responsemessage);
        setMsg(response.data.responsemessage);
        if (response.data.responsecode === "00") {
          setMsg("Account successfully created");
        }
        if (response.data.responsecode !== "00") {
          setMsg(response.data.responsemessage);
        }
      });
  };
  return (
    <>
      <div className={styles.page}>
        <h1 className={styles.header}>Registration Page</h1>
        <h4 className={styles.subheader}>Fill this form and submit to create an account</h4>
        {msg && <h4 className={styles.error}>{msg}</h4>}
        <div className={styles.form}>
          <div>
            <label htmlFor="fname">First Name</label>
            <input
              autoComplete="on"
              type="text"
              value={fname}
              onChange={e => setFname(e.target.value)}
              name="fname"
              id="fname"
            />
          </div>
          <div>
            <label htmlFor="lname">Last Name</label>
            <input
              autoComplete="on"
              type="text"
              value={lname}
              onChange={e => setLname(e.target.value)}
              name="lname"
              id="lname"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="on"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              name="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="off"
              type="password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              name="password"
              id="password"
            />
          </div>
          <div>
            <label htmlFor="phone">Mobile Number</label>
            <input
              autoComplete="on"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              name="phone"
              id="phone"
            />
          </div>
          <div>
            <label htmlFor="fname">Address</label>
            <input
              autoComplete="on"
              type="text"
              value={addr}
              onChange={e => setAddr(e.target.value)}
              name="address"
              id="address"
              cols="8"
              row="3"
            />
          </div>
          <div>
            <label htmlFor="type">User Type</label>
            <input autoComplete="on" type="number" value={type} onChange={e => setType(e.target.value)} name="type" id="type" />
          </div>
          <div>
            <button className={styles.submit} type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div>
          <h3 className={styles.subheader}>
            Existing User? Click Here to <Link to="login">Login</Link>
          </h3>
        </div>
      </div>
    </>
  );
}

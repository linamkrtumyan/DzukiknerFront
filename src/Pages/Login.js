import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Route } from "react-router-dom";
import PoolPage from "./PoolPage";
import "./style.css";

const secretKey = "6LecLQoaAAAAAD5uQQ37dD5n-xh76rhIU4HFwlMR";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState({});

  useEffect(() => {
    createToken();
  }, []);

  const createToken = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(secretKey, {
          action: "submit",
        })
        .then((captcha) => {
          setCaptcha(captcha);
        });
    });
  };

  const handleSubmit = (event) => {
    console.log(mail);
    console.log(password);
    console.log(captcha);
    event.preventDefault();

    axios
      .post(`/user/login`, { mail, password, captcha })
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
          console.log("true a");
          toast.error(res.data);
          window.location = "/pools";
        } else {
          console.log(res.data);

          toast.error(res.data);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form className="login">
      <FormGroup>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={mail}
          id="email"
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormGroup>

      <FormGroup check>
        <Form.Label check>
          <Form.Control type="checkbox" id="chackbox" />
          {"Հիշիր ինձ"}
        </Form.Label>
      </FormGroup>
      <FormGroup></FormGroup>

      <hr />

      <Button
        onClick={handleSubmit}
        size="lg"
        className="bg-gradient-theme-left border-0"
        block
      >
        {"Մուտք"}
      </Button>
    </Form>
  );
}

export default Login;

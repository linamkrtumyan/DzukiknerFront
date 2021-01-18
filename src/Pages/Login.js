import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form, FormGroup } from "react-bootstrap";
import "./style.css";

import { connect } from "react-redux";
import { login } from "../redux/auth/actions";
import { useHistory } from "react-router-dom";

const secretKey = "6LecLQoaAAAAAD5uQQ37dD5n-xh76rhIU4HFwlMR";

function Login({ isLoggedIn, login }) {
  console.log(isLoggedIn);
  let history = useHistory();

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
          console.log("Success is true!");
          toast.error(res.data);
          login(true);
          console.log(isLoggedIn);
          // history.reloa("/pools");
          window.location.reload();
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
        <Form.Label>Էլ․ փոստ 📧</Form.Label>
        <Form.Control
          value={mail}
          id="email"
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Ծածկագիր 🔐</Form.Label>
        <Form.Control
          value={password}
          id="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormGroup>

      <FormGroup check="true">
        <Form.Check type="checkbox" label="Հիշիր ինձ" />
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (isLoggedIn) => dispatch(login(isLoggedIn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

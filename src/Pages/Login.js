import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form, FormGroup } from "react-bootstrap";
import "./style.css";

const secretKey = "6LecLQoaAAAAAD5uQQ37dD5n-xh76rhIU4HFwlMR";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState({});
  const [isDisabled, setDisable] = useState(true);
  const [classname, setClassame] = useState("");

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
    event.preventDefault();

    if (mail == "" && password == "") {
      setDisable(true);
    }

    axios
      .post(`/user/login`, { mail, password, captcha })
      .then((res) => {
        if (res.data.success) {
          toast.error(res.data);
          window.location.reload();
        } else {
          //information given about wrong password or email.
          setClassame("form-control is-invalid");
          toast.error("Սխալ էլ․ փոստ կամ գաղտնաբառ");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <Form className="login">
      <FormGroup>
        <Form.Label className="log_label">Էլ․ փոստ</Form.Label>
        <Form.Control
          value={mail}
          id="email"
          className="log_input"
          onChange={(e) => {
            setMail(e.target.value);
            setDisable(false);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label className="log_label">Գաղտնաբառ</Form.Label>
        <Form.Control
          value={password}
          id="password"
          type="password"
          className="log_input"
          onChange={(e) => {
            setPassword(e.target.value);
            setDisable(false);
          }}
        />
      </FormGroup>

      <FormGroup check="true">
        <Form.Check type="checkbox" label="Հիշիր ինձ" />
      </FormGroup>
      <FormGroup></FormGroup>

      <hr />

      <Button
        disabled={isDisabled}
        onClick={handleSubmit}
        size="lg"
        style={{ backgroundColor: "white !important" }}
        // className="bg-gradient-theme-left border-0"
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

export default Login;

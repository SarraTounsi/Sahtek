import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  VERIFY_TOKEN_MUTATION,
  RESEND_MAIL_VERIFICATION_MUTATION,
} from "../../apis/users";
import { userLogout } from '../../store/users/user.actions';

import { Button, Container, Row, Col, Alert, Form, Input, InputGroupAddon, } from "reactstrap";
import { useDispatch } from "react-redux";
 import { useForm } from "react-hook-form";

function MailVerification() {
  const navigate = useNavigate();
  const [showAlert, setAlert] = useState(false);
  const [isHiddesn, setisHiddesn] = useState(false);
  const [validUrl, setValidUrl] = useState();

  const [resendMailVerification, { loading, error, data }] = useMutation(
    RESEND_MAIL_VERIFICATION_MUTATION
  );
  const userid = useParams("userId");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(userLogout());
    navigate("/login");
  };
  const initialValues = {
    code: "",
 
  };

  const {
    handleSubmit,
  
  } = useForm({
    initialValues,
   
  });

  const [verifyToken, { loadingP, errorP, dataP }] = useMutation(
    VERIFY_TOKEN_MUTATION
  );


  const ResendMail = () => {
    async function resendMail() {
      const { data } = await resendMailVerification({
        variables: {
          resendMailVerificationId: userid.userId,
        },
      });
      console.log(data.resendMailVerification);
      if (data.resendMailVerification === "mail sent") {
        setisHiddesn(true);
        setAlert(true);
      } else if (data.resendMailVerification === "user not found") {
      }

    }
    resendMail();
    navigate("/mail-verification/:userId")
  };

 


  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const submit = handleSubmit(async ({ code }) => {
      try {
        const { data } = await verifyToken({
          variables: {
            userId: userid.userId,
            verificationTokenInput: {
              token: code,
            },
          },
        });

        console.log(data.verifyToken);
        if (data.verifyToken === "success") {
          setValidUrl("success");
        } else if (data.verifyToken === "expired") {
          setValidUrl("expired");
        } else if (data.verifyToken === "not found") {
          setValidUrl("not found");
        } else if (data.verifyToken === "invalid code") {
          setValidUrl("not found");
        }
      
     
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Fragment>
      {validUrl === '' ? (<div
        className="section section-image  "
        style={{ height: "100vh", paddingTop: "250px" }}
      >
        <div className="section">
          <Container className="text-center bg-light ">
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className=" text-danger mb-5">Verify your email</h2>
                <p className="note mt-5">
                  We have sent you an email to verify your email address and
                  activate your<a href="https://mail.google.com/mail/u/"> account. </a>

                </p>
                <br />
                <p> Enter the provided code:</p>

                <Form className="contact-form">
                  <Row>
                    <Col>


                      <InputGroupAddon addonType="prepend">
                      </InputGroupAddon>
                      <Input placeholder="Code" type="text" name="code" />

                    </Col>

                  </Row>

                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Verify My Account
                      </Button>
                    </Col>
                  </Row>
                </Form>


              </Col>


            </Row>
          </Container>
        </div>
      </div>) : validUrl === "success" ? (
        <div
          style={{
            backgroundColor: "#6bd098",
          }}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          <div className="filter" />
          <Container>
            <div className="motto text-center ">
              <img
                style={{
                  width: "60px",
                  height: "60px",
                  marginBottom: "0px",
                }}
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("../../assets/img/checked.png")}
              />

              <h2 className="title">Email Verified</h2>
              <h4 className="title">
                You can now sign in with your new account
              </h4>
              <br />

              <Button
                className="btn-round  "
                onClick={handleClick}
                color="neutral"
                type="button"
                outline
              >
                Log in
              </Button>
            </div>
          </Container>
        </div>
      ) : validUrl === "expired" ? (
        ////////////////////////    not verified

        <div
          style={{}}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          <div className="section">
            <Container className="text-center">
              <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                  <h2 className="title text-danger">
                    Your email is not verified!
                  </h2>
                  <p className="note">
                    We have sent you the verification mail. If you did not
                    receive the Email Verification mail please click on the
                    resend button.
                  </p>
                </Col>
                <Col className="ml-auto mr-auto download-area" md="5">
                  <Button
                    className="btn-round"
                    onClick={ResendMail}
                    hidden={isHiddesn}
                    color="danger"
                  >
                    Resend verification mail
                  </Button>
                </Col>

                <Row></Row>
              </Row>

              <Row>
                <Col>
                  {showAlert ? (
                    <Alert color="info">
                      <Container>
                        <span>
                          We have sent you the verification mail please verify.
                        </span>
                      </Container>
                    </Alert>
                  ) : (
                    <p></p>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ) : validUrl === "not found" ? (
        <div
          style={{
            backgroundColor: "#ffffff",
          }}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          {" "}
          <h1>NOT FOUND</h1>
        </div>
      ) : (
        <div></div>
      )}
    </Fragment>
  );
}
export default MailVerification;

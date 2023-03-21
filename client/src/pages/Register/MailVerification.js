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

function MailVerification() {
  const navigate = useNavigate();
 
  const [validCode, setvalidCode] = useState('');
  const [code, setCode] = useState('');

  const [resendMailVerification, { loading, error, data }] = useMutation(
    RESEND_MAIL_VERIFICATION_MUTATION
  );
  const userid = useParams("userId");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(userLogout());
    navigate("/login");
  };


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
       
      } else if (data.resendMailVerification === "user not found") {
      }
      setvalidCode("verify");
    }
    resendMail();

    //navigate(`/mail-verification/${userid.userId}`)
  };




  let pageHeader = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform = "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const submit = () => {
    try {
      async function Verify() {
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
          setvalidCode("success");
        } else if (data.verifyToken === "expired") {
          setvalidCode("expired");
        } else if (data.verifyToken === "not found") {
          setvalidCode("not found");
        } else if (data.verifyToken === "invalid code") {
          setvalidCode("invalid code");
        }
      }
      Verify();


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      async function verification() {
        const { data } = await verifyToken({
          variables: {
            userId: userid.userId,
            verificationTokenInput: {
              token: '',
            },
          },
        });

        console.log(data.verifyToken);
        if (data.verifyToken === "success") {
          setvalidCode("success");
        } else if (data.verifyToken === "expired") {
          setvalidCode("expired");
        } else if (data.verifyToken === "not found") {
          setvalidCode("not found");
        } else {
          setvalidCode("verify");

        }
      }
      verification();
    } catch (error) {
      console.log(error);
    }
  }, [userid]);

  return (
    <Fragment>
      {validCode === 'verify' || validCode === "invalid code" ? (
        <div
          className="section section-image  "
          style={{ height: "100vh", paddingTop: "250px" }}
        >
          <div className="section">
            <Container className="text-center bg-light ">
              <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                  <h2 className=" text-info mb-5">Verify your email</h2>
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
                        <Input placeholder="Code" type="text" name="code" value={code} onChange={(e) => setCode(e.target.value)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {validCode === "invalid code" ? (
                          <Alert color="danger">
                            <Container>
                              <span>
                                Provided verification code is invalid.
                              </span>
                            </Container>
                          </Alert>
                        ) : (
                          <p></p>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-auto mr-auto" md="4">
                        <Button className="btn-fill" color="danger" size="lg" onClick={submit}>
                          Verify My Account
                        </Button>
                      </Col>
                    </Row>

                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </div>) : validCode === "success" ? (
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
        ) : validCode === "expired" ? (
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
                       color="danger"
                    >
                      Resend verification mail
                    </Button>
                  </Col>

                  <Row></Row>
                </Row>
 
              </Container>
            </div>
          </div>
        ) : validCode === "not found" ? (
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

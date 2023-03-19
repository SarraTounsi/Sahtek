import React from "react";

import { Button, Container, Row, Col, Form, Input, InputGroupAddon, InputGroup } from "reactstrap";

function AlertCheckMail() {
  return (
    <div
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
                activate your account. <a href="https://mail.google.com/mail/u/">Click here</a>
                <b /> Enter the provided code.
              </p>
              {/* <a
                  className="btn btn-primary mt-5"
                  rel="noreferrer"
                  href="https://mail.google.com/mail/u/"
                  target="_blank"
                >
                  {" "}
                  CLick Here
                </a> */}
              <Form className="contact-form">
                <Row>
                  <Col>


                    <InputGroupAddon addonType="prepend">
                    </InputGroupAddon>
                    <Input placeholder="Code" type="text" />

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
    </div>
  );
}
export default AlertCheckMail;

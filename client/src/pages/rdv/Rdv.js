import { useMutation, gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./Rdv.module.scss";

import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";

const USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;
export const BOOK_APPOINTMENT = gql`
  mutation bookAppointment(
    $patient: ID
    $therapist: ID
    $date: String
    $duration: Int
    $notes: String
    $status: String
  ) {
    bookAppointment(
      patient: $patient
      therapist: $therapist
      date: $date
      duration: $duration
      notes: $notes
      status: $status
    )
  }
`;

function Rdv() {
  const [bookAppointment] = useMutation(BOOK_APPOINTMENT);

  const user = useSelector(selectUser);
  const [note, setNote] = useState("");
  const [date, setDate] = useState("dateapp");
  const [selectedValue, setSelectedValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    therapist: "",
    date: "",
    note: "",
  };
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
  });
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const submit = handleSubmit(async ({}) => {
    //clearErrors();
    try {
      await bookAppointment({
        variables: {
          patient: user.id,
          therapist: selectedValue,
          date: date,
          duration: 1,
          notes: note,
          status: "Scheduled",
        },
      });

      setErrorMessage("appointment booked");

      console.log("succes");
    } catch (error) {
      setErrorMessage(error.message);
      //alert(error.message);
    }
  });
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  //console.log(data);

  return (
    <>
      <div>
        <div
          className="section-appo"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/appo.jpg") + ")",
          }}
        >
          <h2>Get Your Appointment </h2>
          <h4>Home - Appoitment</h4>
        </div>

        <div class={`${styles.tt}`}>
          <div class={`${styles.card} card`}>
            <h3>Book your appoitment</h3>
            <form action="https://formbold.com/s/FORM_ID">
              <div class={`${styles.formboldmb5}`}>
                <select
                  class="browser-default custom-select"
                  onChange={handleSelectChange}
                >
                  <option selected>Choose your doctor here</option>
                  {data.users.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div class={`${styles.formboldmb5}`}>
                <label for="date" class={`${styles.formboldformlabel}`}>
                  {" "}
                  Reason{" "}
                </label>

                <textarea
                  type="text"
                  name="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  id="note"
                  placeholder="Write your message here..."
                  class={`${styles.formboldforminput}`}
                />
              </div>

              <div class="flex flex-wrap formbold--mx-3">
                <div class="w-full sm:w-half formbold-px-3">
                  <div class="formbold-mb-5 w-full">
                    <label for="date" class={`${styles.formboldformlabel}`}>
                      {" "}
                      Date{" "}
                    </label>
                    <input
                      type="datetime-local"
                      name="dateapp"
                      id="date"
                      disableClock
                      format="dd/MM/yyyy HH:mm"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      class={`${styles.formboldforminput}`}
                    />
                  </div>
                </div>
              </div>
              <div class=" d-flex flex-column text-center px-5 mt-3 mb-3">
                {" "}
                <small class="agree-text">
                  By Booking this appointment you agree to the
                </small>{" "}
                <a href="#" class="terms">
                  Terms & Conditions
                </a>{" "}
              </div>

              <div>
                <button class={`${styles.formboldbtn}`} onClick={submit}>
                  Book Appointment
                </button>
              </div>
              {errorMessage === "appointment booked" ? (
                <div style={{ color: "green" }}>{errorMessage}</div>
              ) : (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
            </form>
          </div>
          <div class={`${styles.work}`}>
            <h3 class={`${styles.fontt}`}>Working Hours</h3>
            <div class={`${styles.dispo}`}>
              <h5 class={`${styles.day}`}>
                Monday - Friday <br></br> Saturday
              </h5>
              <h5 class={`${styles.time}`}>
                8:00am To 6:00pm<br></br>9:00am To 1:00pm
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rdv;

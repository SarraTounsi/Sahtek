import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import TherapistCard from "./TherapistCard";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/users/users.selectors";
import loader from "../../../assets/img/loading.gif";
import { useState } from "react";
const THERAPISTSBYPATIENTS = gql`
  query GetTherapistsByPatient($id: ID!) {
    getTherapistsByPatient(ID: $id) {
      name
      profileImage
      id
      therapist {
        description
        specialties
      }
    }
  }
`;

const PatientTherapist = () => {
  const user = useSelector(selectUser);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const {
    loading: therapistLoading,
    error: therapistError,
    data: therapistData,
  } = useQuery(THERAPISTSBYPATIENTS, {
    variables: {
      id: user.id,
    },
  });

  const filteredTherapist = therapistData?.getTherapistsByPatient?.filter(
    (therapist) =>
      therapist?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.therapist.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (therapistLoading) {
    return (
      <div className=" section d-flex justify-content-center align-items-center">
        <img src={loader} alt="Loading..." />
      </div>
    );
  }

  if (therapistError) {
    return <div>Error: {therapistError.message}</div>;
  }
  return (
    <div className="section">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <InputGroup style={{ width: "400px" }}>
          <Input
            placeholder="Search for a therapist"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <InputGroupAddon addonType="append">
            <Button color="primary">Search</Button>
          </InputGroupAddon>
        </InputGroup>
        <Button color="secondary">All Therapists</Button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "5rem",
          rowGap: "4rem",
        }}
      >
        {filteredTherapist &&
          filteredTherapist.map((t, index) => (
            <TherapistCard
              key={index}
              name={t.name}
              image={t.profileImage}
              description={t.therapist.description}
              id={t.id}
            />
          ))}
        {filteredTherapist.length === 0 && (
          <div className=" section d-flex justify-content-center align-items-center w-100">
            <h2>No Therapist Yet ...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTherapist;

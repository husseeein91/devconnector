import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, from, to, current, fieldofstudy, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">
        {" "}
        <strong>School: </strong> {school}
      </h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      {fieldofstudy && (
        <p>
          <strong>Field Of Study: </strong>
          {fieldofstudy}
        </p>
      )}
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  experince: PropTypes.object.isRequired,
};

export default ProfileEducation;

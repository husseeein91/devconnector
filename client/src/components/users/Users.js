import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user";

const Users = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <Fragment>
      {users.length > 0 ? (
        users.map((user) => (
          <div className="profile bg-light">
            <img src={user.avatar} alt="" className="round-img" />
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.password}</p>
            </div>
          </div>
        ))
      ) : (
        <span>there is no users</span>
      )}
    </Fragment>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.user.users,
});
export default connect(mapStateToProps, { getUsers })(Users);

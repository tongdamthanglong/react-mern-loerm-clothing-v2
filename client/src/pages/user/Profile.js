import React from "react";

import UserMenu from "../../components/nav/UserMenu";

const Profile = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>
            <p>Update Form...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import * as React from "react";

import NoReviewDataImage from "../../../assets/no_review.png";

class NoReviewData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          src={NoReviewDataImage}
          alt="No Review Data"
          width="60%"
          height="100%"
          className="image-no-data"
        />
        <p className="text-blue font-weight-bold font-20px text-blue">
          Oops... There are not any reviews yet
        </p>
      </div>
    );
  }
}

export default NoReviewData;

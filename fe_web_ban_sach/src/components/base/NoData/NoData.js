import * as React from "react";

import NoDataImage from "../../../assets/no_data.png";

class NoData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          src={NoDataImage}
          alt="No Data"
          width="60%"
          height="100%"
          className="image-no-data"
        />
        <p className="text-blue font-weight-bold font-20px text-blue">
          Oops... No matching data
        </p>
      </div>
    );
  }
}

export default NoData;

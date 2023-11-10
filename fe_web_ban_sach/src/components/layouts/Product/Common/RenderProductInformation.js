import * as React from "react";

import ProductInformation from "../ProductInformation";
import ProductInformationSkeleton from "../../../base/Skeleton/ProductInformationSkeleton";
import { bookCoverData } from "../../../../assets/data/bookcover.js";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../../utils/useSelector.js";

class RenderProductInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const productInformation =
      this.props.product.detail_book.length === 0 ? (
        <ProductInformationSkeleton />
      ) : (
        <>
          {this.props.product.detail_book.map((item, index) => (
            <ProductInformation
              key={index}
              cover={bookCoverData[item.book_cover_photo]}
              author={item.author_name}
              title={item.book_title}
              summary={item.book_summary}
            />
          ))}
        </>
      );

    return <>{productInformation}</>;
  }
}

export default connect(mapStateToProps, null)(RenderProductInformation);

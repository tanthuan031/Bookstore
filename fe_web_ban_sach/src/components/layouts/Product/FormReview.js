import * as React from "react";
import * as yup from "yup";

import { Button, Card, Form } from "react-bootstrap";

import Notiflix from "notiflix";
import Swal from "sweetalert2";
import TextField from "../../base/TextField/TextField.js";
import { connect } from "react-redux";
import { createNewReview } from "../../../adapters/ProductAdapter/ProductAdapter.js";
import { mapStateToProps } from "../../../utils/useSelector.js";
import { ratingStar } from "../../../assets/data/ratingstar.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    review_title: yup
      .string()
      .min(12, "Title must be at least 12 characters")
      .max(120, "Title must be at most 120 characters")
      .required("Required"),
    rating_star: yup.number().positive().integer().required("Required"),
  })
  .required();

function FormReview({ bookId, app }) {
  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const review = Object.assign({}, data);
    review.book_id = bookId;
    Notiflix.Block.hourglass("#form-review", "Please wait...", {
      backgroundColor: "rgba(239, 244, 251, 0.91)",
      messageColor: "#739dd8",
      svgColor: "#739dd8",
      fontWeight: "700",
    });
    const result = await createNewReview(review);
    if (result.status === "success") {
      let timer = 5;
      Notiflix.Block.remove("#form-review");
      setTimeout(() => {
        Swal.close();
        window.location.reload();
      }, 5000);
      Swal.fire({
        title:
          "<p class='text-blue font-20px font-weight-bold'>Submit review successfully</p>",
        html: "<p className='font-16px font-weight-semi'>This page will reload after <b></b> seconds</p>",
        icon: "success",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        timer: 5000,
        didOpen: () => {
          const b = Swal.getHtmlContainer().querySelector("b");
          b.textContent = 5;
          timer = setInterval(() => {
            b.textContent = Math.abs(Swal.getTimerLeft() / 1000).toFixed(0);
          }, 500);
        },
      });
    }
    if (result.status_code && result.status_code === "422") {
      Notiflix.Block.remove("#form-review");
    }
  };

  const resetForm = () => {
    resetField("title");
    resetField("rating_star");
  };

  return (
    <Form id="form-review" onSubmit={handleSubmit(onSubmit)}>
      <Card className={`${app.width <= 400 ? "mx-2" : ""}`}>
        <Card.Header className="bg-blue">
          <p className="text-white font-weight-bold font-18px">
            Write a Review
          </p>
        </Card.Header>
        <Card.Body>
          <TextField
            label="Add a title"
            type="text"
            mandatory={true}
            select={false}
            message={errors.review_title?.message}
            {...register("review_title")}
            name="review_title"
          />
          <TextField
            label="Details please! Your review helps other shoppers"
            type="text"
            kind="textarea"
            {...register("review_details")}
            name="review_details"
            select={false}
          />
          <TextField
            label="Select a rating star"
            type="text"
            select={true}
            mandatory={true}
            isClearable={true}
            values={ratingStar}
            message={errors.rating_star?.message}
            control={control}
            name="rating_star"
            {...register("rating_star")}
          />
          <small className="text-red d-flex flex-column">
            <i>* is mandatory</i>
            <i>* Title must be between 12 and 120 in length</i>
          </small>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="blue"
            block
            className="font-weight-semi font-16px"
            type="submit"
          >
            Submit Review
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
}

export default connect(mapStateToProps, null)(FormReview);

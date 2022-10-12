import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExpenses() {
  const url = "http://localhost:8083/api/expenses/1";
  const navigate = useNavigate();

  const [expense, setExpense] = useState({});

  const inputHandler = (event) => {
    setExpense((expense) => ({
      ...expense,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post(url, expense)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
    navigate(-1);
    // console.log(expense);
  };

  return (
    <div className="col-md-6 offset-3 text-center mt-5">
      <h1>Add Expenses</h1>
      <div className="mt-3">
        <form onSubmit={onSubmitHandler}>
          <div class="mb-3">
            <label for="expense__name" class="form-label">
              Expense Name
            </label>
            <input
              type="text"
              className="form-control"
              id="expense__name"
              name="name"
              onChange={inputHandler}
            />
          </div>

          <div className="mb-3">
            <label for="expense__type" class="form-label">
              Expense Type
            </label>
            <input
              type="text"
              class="form-control"
              id="expense__type"
              name="type"
              onChange={inputHandler}
            />
          </div>

          <div className="mb-3">
            <label for="expense__remark" class="form-label">
              Expense Remark
            </label>
            <input
              type="text"
              class="form-control"
              id="expense__name"
              name="remark"
              onChange={inputHandler}
            />
          </div>

          <div className="mb-3">
            <label for="expense__remark" class="form-label">
              Expense Price
            </label>
            <input
              type="number"
              class="form-control"
              id="expense__name"
              name="price"
              onChange={inputHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpenses;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditExpense() {
  const params = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    name: "test",
    type: "testtype",
    remark: "rm",
  });
  const url = `http://localhost:8083/api/expenses/${params.id}/${params.expenseId}`;

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        setExpense(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    console.log(expense);
  }, []);

  const inputHandler = (event) => {
    setExpense((expense) => ({
      ...expense,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .put(url, expense)
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp);
          // navigate(`/dashboard/${params.id}`);
          navigate(-1);
        }
      })
      .catch((err) => console.log(err));
    // console.log(expense);
  };

  return (
    <div className="col-md-6 offset-3 text-center mt-5">
      <h3>Edit expense</h3>
      <div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label for="expense__name" class="form-label">
              Expense Name
            </label>
            <input
              type="text"
              className="form-control"
              id="expense__name"
              name="name"
              value={expense.name}
              onChange={inputHandler}
              required
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
              value={expense.type}
              onChange={inputHandler}
              required
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
              value={expense.remark}
              onChange={inputHandler}
              required
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
              value={expense.price}
              onChange={inputHandler}
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditExpense;

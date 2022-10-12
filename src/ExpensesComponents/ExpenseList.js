import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function ExpenseList() {
  const url = "http://localhost:8083/api/expenses";
  const [expenses, setExpenses] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const setData = (url) => {
    axios
      .get(url)
      .then((resp) => setExpenses(resp.data))
      .catch((err) => console.log(err));
  };

  const deleteExpenses = (id) => {
    axios.delete(`http://localhost:8083/api/expenses/${params.id}/${id}`)
      .then((resp) => {
        setData(url);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const approveExpense = (id, approveStat) => {
    const data = {};
    if (approveStat) {
      data.approved = 0;
    } else {
      data.approved = 1;
    }
    axios.post(`http://localhost:8083/api/expenses/${params.id}/approveExpenses/${id}`, data)
      .then((resp) => {
        setData(url);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(data);
  }

  useEffect(() => {
    setData(url);
    // console.log(expenses);
  }, []);

  const card = expenses.map((expense, index) => {
    return (
      <div className="card my-4" key={index}>
        <div className="card-header">{expense.type}</div>
        <div className="card-body">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end me-5">
            <Badge bg="primary">{expense.approved ? 'Approved' : 'NotApproved'}</Badge>
          </div>
          <h5 className="card-title">{expense.name}</h5>

          <p className="card-text">{expense.remark}</p>
          <p className="card-text">Price:- {expense.price}</p>
          {/* <ApproveButton /> */}
          <div className={params.id === '3' ? 'd-none' : ''}>
            <button className="btn btn-primary" disabled={params.id !== '2'} onClick={() => {
              approveExpense(expense.id, expense.approved);
            }}>{expense.approved ? 'RemoveApproval' : 'Approve'}</button>
            <button
              disabled={params.id === '2'}
              className="btn btn-success mx-4"
              onClick={() => {
                navigate(`/dashboard/${params.id}/${expense.id}`);
              }}
            >
              Edit
            </button>
            <button disabled={params.id === '2'} className="btn btn-danger" onClick={() => {
              deleteExpenses(expense.id);
            }}>Delete</button>
          </div>
        </div>
      </div>
    );
  });

  return <div className="container">{card}</div>;
}

export default ExpenseList;

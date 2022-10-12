import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ExpenseList from '../ExpensesComponents/ExpenseList'

function ManagerDashboard() {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end me-5'>
                <button disabled={params.id !== '1'} className='btn btn-primary btn-lg' onClick={() => {
                    navigate(`/dashboard/${params.id}/addExpense`)
                }}>Add Expense</button>
            </div>
            <ExpenseList />
        </div>
    )
}

function HrDashboard() {
    return (
        <div>
            <ExpenseList />
        </div>
    )
}

function AdminDashboard() {
    const params = useParams();
    const [total, setTotal] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8083/api/expenses/${params.id}/getTotal`)
            .then(resp => {
                setTotal(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    })

    return (
        <div>
            <div className='d-flex justify-content-around'>
                <p className="fs-2">Total Approved Expenses:- {total}</p>
                <div>
                    <Button variant="primary" onClick={() => setShow(true)}>
                        PayNow!
                    </Button>

                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Payment...
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Payment Done Sucessfully</p>
                            <p>Thank You.</p>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            <ExpenseList />
        </div>
    )
}

function UserDashboard() {
    const location = useLocation();
    const [userData] = useState(location.state);


    const UserDisplay = () => {
        if (userData.id === 1) {
            return (
                <div>
                    <ManagerDashboard />
                </div>
            )
        }
        else if (userData.id === 2) {
            return (
                <div>
                    <HrDashboard />
                </div>
            )
        }
        else if (userData.id === 3) {
            return (
                <div>
                    <AdminDashboard />
                </div>
            )
        }

    };

    return (
        <div className='container text-center mt-5'>
            <h2>{userData.message}</h2>
            <UserDisplay />
        </div>
    )
}

export default UserDashboard
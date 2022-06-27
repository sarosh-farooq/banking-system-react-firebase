import React from 'react'
import './AllCustomers.css'
import { db } from '../../firebase'
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from "firebase/database";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AllCustomer = () => {

    let navigate = useNavigate();
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([])

    /* function to get all userData from firestore in realtime */
    useEffect(() => {
        const q = query(collection(db, 'userData'),)
        onSnapshot(q, (snapshot) => {
            setUserData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            setLoading(false)
        })
    }, [])

    console.log(userData)

    function handleClick() {
        navigate("/new-customers");
    }

    return (
        <div className='container'>
            <div className='FlexCenter'>
                <h2>Customer Details</h2>
                <button onClick={handleClick}>Create New</button>
            </div>
            {/* <td>{todos.key1.account_number}</td> */}
            {loading == true ?
                <div className='loadingCon'>
                    <h3 className='loading'>Loading</h3>
                    <div className='animation'>
                        <div className="dot1"> </div>
                        <div className="dot2"></div>
                        <div className="dot3"></div>
                    </div>
                </div>
                : userData.length == 0 ? 'No data present' :
                    <div class="cust_detail">
                        <table>
                            <thead>
                                <tr>
                                    <th>Account Type</th>
                                    <th>Account No#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Current Balance</th>

                                </tr>
                            </thead>

                            <tbody>



                                {
                                    userData.map(item => (
                                        <tr key={item.id} onClick={() => navigate(`/customer-detail/${item.id}`)}>
                                            <td>{item.data.account_type}</td>
                                            <td>{item.data.account_number}</td>
                                            <td class="name">{item.data.full_name}</td>
                                            <td class="email">{item.data.email}</td>
                                            <td class="cur_balance">{item.data.current_balance}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>


                        </table>
                    </div>
            }
        </div>
    )
}

export default AllCustomer
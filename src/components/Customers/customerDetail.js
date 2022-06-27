import React, { useState, useEffect } from 'react'
import { Route, Link, Routes, useParams } from 'react-router-dom';

import { db } from '../../firebase'
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";

function CustomerDetail() {
    const params = useParams();
    let navigate = useNavigate();

    const [customer, setCustomer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);

    const [userData, setUserData] = useState({
        account_number: "",
        account_type: "",
        full_name: "",
        email: "",
        address: "",
        current_balance: "",
    });


    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const docRef = doc(db, 'userData', params.id)
        const docSnap = await getDoc(docRef);
        setCustomer({
            id: docSnap.id,
            data: docSnap.data()
        })
        setLoading(false)
    }


    const updateUser = () => {
        setUserData({
            account_number: customer.data.account_number,
            account_type: customer.data.account_type,
            full_name: customer.data.full_name,
            email: customer.data.email,
            address: customer.data.address,
            current_balance: customer.data.current_balance,
        })
        setEdit(true)
    }

    const postUserData = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUserData({ ...userData, [name]: value });
        console.log(userData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const taskDocRef = doc(db, 'userData', params.id)
        setLoading(true)
        try {
            await updateDoc(taskDocRef, {
                account_type: userData.account_type,
                account_number: userData.account_number,
                full_name: userData.full_name,
                email: userData.email,
                address: userData.address,
                current_balance: userData.current_balance,
                delete: false,
                created_at: new Date(),
            })
            alert('Data is updated')
        } catch (err) {
            alert(err)
        }
        setEdit(false)
        getData()
    }

    const handleDelete = async () => {
        setLoading(true)
        const taskDocRef = doc(db, 'userData', params.id)
        try {
            await deleteDoc(taskDocRef)
            alert('User is deleted')
            navigate('/all-customers')
        } catch (err) {
            alert(err)
        }
        setLoading(false)
    }


    return (
        <div class="container">
            {edit == false ?
                <>
                    <h2>Customer Details</h2>
                    {loading == true ?
                        <div className='loadingCon'>
                            <h3 className='loading'>Loading</h3>
                            <div className='animation'>
                                <div className="dot1"> </div>
                                <div className="dot2"></div>
                                <div className="dot3"></div>
                            </div>
                        </div>
                        :
                        <div class="con">
                            <p><b>Account Type:</b>&nbsp;{customer.data.account_type}</p>
                            <p><b>Account Number:</b>&nbsp;{customer.data.account_number}</p>
                            {/* <p><b>Account Opening Date:</b>&nbsp;{customer.data.created_at}</p> */}
                            <p><b>Full Name:</b>&nbsp;{customer.data.full_name}</p>
                            <p><b>Email:</b>&nbsp;{customer.data.email}</p>
                            <p><b>Postal Address:</b>&nbsp;{customer.data.address}</p>
                            <p><b>Current Balance:</b>&nbsp;<span id="total_amount">${customer.data.current_balance}</span></p>

                            <button onClick={()=>  navigate('/all-customers')}>Back</button>
                            <button onClick={updateUser}>Edit Detail</button>
                            {loading == true ?
                                <div className='loadingCon'>
                                    <h3 className='loading'>Deleting</h3>
                                    <div className='animation'>
                                        <div className="dot1"> </div>
                                        <div className="dot2"></div>
                                        <div className="dot3"></div>
                                    </div>
                                </div>
                                :
                                <button onClick={handleDelete}>Delete Detail</button>
                            }
                        </div>
                    }
                </>
                :
                <div>
                    <h2 style={{ textAlign: 'center' }}>Update Customer Details</h2>
                    <form action="" method="post">
                        <div class="grp_form">
                            <input type='number' minLength={16} name="account_number" id="account_number" placeholder="Account Number" value={userData.account_number} onChange={postUserData} required />
                            <input type='text' name="account_type" id="account_type" placeholder="Account Type" value={userData.account_type} onChange={postUserData} required />
                        </div>
                        <div class="grp_form">
                            <input type='text' name="full_name" id="full_name" placeholder="Full Name" required value={userData.full_name} onChange={postUserData} />
                            <input type='email' name="email" id="email" placeholder="Email" required value={userData.email} onChange={postUserData} />
                        </div>
                        <div class="grp_form">
                            <input type='text' name="address" id="address" placeholder="Address" required value={userData.address} onChange={postUserData} />
                            <input type='number' name="current_balance" id="current_balance" placeholder="Current Balance" required value={userData.current_balance} onChange={postUserData} />
                        </div>
                        <div class="grp_form">
                            {loading == true ?
                                <div className='loadingCon'>
                                    <h3 className='loading'>Updating</h3>
                                    <div className='animation'>
                                        <div className="dot1"> </div>
                                        <div className="dot2"></div>
                                        <div className="dot3"></div>
                                    </div>
                                </div>
                                :
                                <button type="submit" onClick={handleSubmit}>Update</button>
                            }
                        </div>
                    </form>
                </div>
            }
        </div>

    )
}

export default CustomerDetail
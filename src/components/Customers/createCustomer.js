import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './AllCustomers.css'

import { db } from '../../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

function CreateCustomer() {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        account_number: "",
        account_type: "",
        full_name: "",
        email: "",
        address: "",
        current_balance: "",
    });

    const postUserData = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUserData({ ...userData, [name]: value });
        console.log(userData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (userData.account_number == '' && userData.account_type == '' && userData.full_name == '' && userData.email == '' && userData.address == '' && userData.current_balance == '') {
            alert('Please fill the form completely')
        }
        else {
            setLoading(true)
            try {
                await addDoc(collection(db, 'userData'), {
                    account_type: userData.account_type,
                    account_number: userData.account_number,
                    full_name: userData.full_name,
                    email: userData.email,
                    address: userData.address,
                    current_balance: userData.current_balance,
                    delete: false,
                    created_at: Timestamp.now(),
                })
                setLoading(true)
                alert("User is Created");
                navigate("/all-customers");
            } catch (err) {
                alert(err)
            }
        }
    }


    return (
        <div className='container' >
            <h2>Customer Details</h2>
            <div>
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
                                <h3 className='loading'>Creating new user</h3>
                                <div className='animation'>
                                    <div className="dot1"> </div>
                                    <div className="dot2"></div>
                                    <div className="dot3"></div>
                                </div>
                            </div>

                            :
                            <button type="submit" onClick={handleSubmit}>Create</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCustomer
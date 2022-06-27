import React from 'react'
import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import AllCustomer from './components/Customers/AllCustomer';
import Navbar from './components/Navbar/Navbar';
import CreateCustomer from './components/Customers/createCustomer';
import CustomerDetail from './components/Customers/customerDetail';

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-customers" element={<AllCustomer />} />
          <Route path="/new-customers" element={<CreateCustomer />} />
          <Route path="/customer-detail/:id" element={<CustomerDetail />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;


// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

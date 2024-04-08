import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Header from './Header';
import Pagination from './Pagination';
import Footer from './Footer';
import axios from 'axios';

export default function Dashboard() {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // replace 'token' with your actual token key
        const url = `https://schoolbackend-one.vercel.app/students`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `${token}`, // replace 'Bearer' with your actual token type
          }
        });
        setStatus(response.status);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setStatus(error.response ? error.response.status : null);
      }
    };
    fetchData();
  }, []);


  if (status === 200) {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  } else {
    return navigate('/'); // or a loading spinner
  }
}

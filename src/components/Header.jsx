import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';

const Header = () => {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages]= useState(0);
  const [approved,setApproved]=useState('validatestudents');
  const navigate= useNavigate()

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // replace 'token' with your actual token key
      const url = searchName !== "" ? `https://schoolbackend-one.vercel.app/${approved}?name=${searchName}` : `https://schoolbackend-one.vercel.app/${approved}?page=${currentPage}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `${token}`, // replace 'Bearer' with your actual token type
        }
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data: ', error);
      // Handle the error. You might want to set some state here.
    }
  };
  

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchName, approved]);

  const removebtn = async (id) => {
    let url = `https://schoolbackend-one.vercel.app/delete/${id}`;
    try {
      await axios.delete(url);
      const response = await axios.get(`https://schoolbackend-one.vercel.app/${approved}?name=${searchName}&page=${currentPage}`);
      setData(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.log('Error deleting candidate', error);
    }
  };

  const addbtn = async (id) => {
    let url = `https://schoolbackend-one.vercel.app/update/${id}`;
    try {
      await axios.patch(url,{approved:true});
      const response = await axios.get(`https://schoolbackend-one.vercel.app/${approved}?name=${searchName}&page=${currentPage}`);
      setData(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.log('Error deleting candidate', error);
    }
  };


  return (
    <>
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Dashboard</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} placeholder="Search" aria-label="Search" />
          <button className="btn btn-dark" onClick={(e)=>{e.preventDefault(); localStorage.removeItem('token'); navigate('/')
}}>Logout</button>
        </form>
      </div>
    </nav>

    <div className="form-check form-switch d-flex justify-content-end m-2">
        <label className="form-check-label pe-5" htmlFor="flexSwitchCheckDefault">Show Verified Students</label>
        <input className="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" onChange={()=>{approved==="students"?setApproved("validatestudents"):setApproved("students")}} />
    </div>

      <div className="container mt-5 mb-5">
      <div className="row">
        {  data.length===0 ? (
        <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', height: 'calc(100vh - 30vh)' }}>
          <h1>No students Found</h1>
        </div>) :(data.map((student) => (
           (
            <div className="col-lg-3 col-md-4 col-sm-6 mx-auto mt-5 mb-5 card" key={student._id} style={{width:'20rem'}}>
            <img src={student.profilepic} className="card-img-top" alt="student profile pic" style={{ borderRadius:"8px", objectFit:"contain", minHeight:"18rem", maxHeight:"18rem" ,transform: "scale(0.85)", transition: "transform 0.3s ease" }} onMouseOver={(e) => { e.target.style.transform = "scale(0.9)"; }} onMouseOut={(e) => { e.target.style.transform = "scale(0.85)"; }} />
            <div className="card-body">
            <h5 className="card-title"><i className="bi bi-person-fill"></i>  {student.std_name}</h5>
            <span>Father: </span><span className="card-title h5">{student.father_name}</span>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item" ><i className="bi bi-envelope-at-fill"></i> {student.email}</li>
              <li className="list-group-item" ><i className="bi bi-telephone-fill"></i> +91 {student.ph_number}</li>
              <li className="list-group-item" ><i className="bi bi-backpack3-fill"></i> {student.std_class}</li>
              <li className="list-group-item" ><i className="bi bi-geo-alt-fill"></i> {student.campus}</li>
            </ul>
            {
                approved==="students"?"":(
                    <div className="card-body">
                      <button className="btn btn-success" onClick={()=>addbtn(student._id)}>Add</button>
                      <button className="btn btn-danger ms-2" onClick={()=>removebtn(student._id)} >Remove</button>
                    </div>)
            }
          </div>
          )
        )))}
      </div>
    </div>
    {
        data.length===0?"":<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    }
    </>
  );
};

export default Header;

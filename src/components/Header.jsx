import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a className="page-link" onClick={() => setCurrentPage(number)}>{number}</a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
}

const Header = () => {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages]= useState(0);
  const [approved,setApproved]=useState('validatestudents');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://schoolbackend-one.vercel.app/${approved}?name=${searchName}&page=${currentPage}`);
        setData(response.data.data);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages)
      } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle the error. You might want to set some state here.
      }
    };
    fetchData();
  }, [currentPage,searchName,totalPages,approved]);

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
          <button className="btn btn-dark">Logout</button>
        </form>
      </div>
    </nav>

    <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={()=>{approved==="students"?setApproved("validatestudents"):setApproved("students")}} />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show Verified Students</label>
    </div>

      <div className="container mt-5 mb-5">
      <div className="row">
        {  data.length===0 ? (
        <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', height: 'calc(100vh - 30vh)' }}>
          <h1>No students Found</h1>
        </div>) :(data.map((student) => (
           (
            <div className="col-lg-3 col-md-4 col-sm-6 mx-auto mt-5 mb-5 card" key={student._id} style={{width:'20rem'}}>
            <img src={student.profilepic} className="card-img-top" alt="student profile pic" style={{ borderRadius:"8px", objectFit:"contain", minHeight:"18rem", maxHeight:"18rem" ,transform: "scale(0.8)", transition: "transform 0.3s ease" }} onMouseOver={(e) => { e.target.style.transform = "scale(1.3)"; }} onMouseOut={(e) => { e.target.style.transform = "scale(0.8)"; }} />
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

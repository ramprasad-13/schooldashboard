import { useEffect, useState } from 'react';
import axios from 'axios';


const Pagination =()=>{
  return(
    <nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
      <li className="page-item disabled">
        <a className="page-link">Previous</a>
      </li>
      <li className="page-item"><a className="page-link" href="#">1</a></li>
      <li className="page-item"><a className="page-link" href="#">2</a></li>
      <li className="page-item"><a className="page-link" href="#">3</a></li>
      <li className="page-item">
        <a className="page-link" href="#">Next</a>
      </li>
    </ul>
   </nav>
  )
}

const MyComponent = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Make an Axios GET request
    axios.get('https://schoolbackend-one.vercel.app/students')
      .then((response) => {
        if(response.data.length===0){
          setData([{noStudents: true}])
        }
        else{
          setData(response.data); // Set the fetched data to state
        }
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const removebtn=(id)=>{
    let url = `https://schoolbackend-one.vercel.app/delete/${id}`
    axios.delete(url)
    .then((response)=>{
      if(response.data.length===0){
        setData([{noStudents: true}])
      }
      else{
        setData(response.data); // Set the fetched data to state
      }
    })
    .catch((error)=>{
      console.log('Error deleting candidate', error);
    });
  }

  return (
    <>
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Dashboard</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" value={} placeholder="Search" aria-label="Search" />
          <button className="btn btn-dark">Logout</button>
        </form>
      </div>
    </nav>
    <div className="container mt-5 mb-5">
      <div className="row">
        {data && Array.isArray(data) && data.map((student) => (
          student.noStudents ?(<div key={student.noStudents} style={{ display: 'flex', justifyContent:'center', alignItems: 'center', height: 'calc(100vh - 30vh)' }}>
          <h1>No students Found</h1>
        </div>) : (
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
            <div className="card-body">
              <button className="btn btn-success">Add</button>
              <button className="btn btn-danger ms-2" onClick={()=>removebtn(student._id)} >Remove</button>
            </div>
          </div>
          )
        ))}
      </div>
    </div>
    <Pagination />
    </>
  );
};

export default MyComponent;

import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Userlogin = (props) => {

  const [credentials,setCredentials] = useState({userid:"", password:""})
  let navigate = useNavigate();          // it lets you use/acccess data used by react-router  like in line 24

  const handleSubmit= async(e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/user/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({userid:credentials.userid,password:credentials.password}) 
      });
      const json= await response.json();       // in this case which is auth token 
      console.log(json);
      if(json.success){
        // Save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/");        //this is redirecting me to the home page after I login
        props.showmsg("Logged In SUCCESSFULLY","success")
      }
      else{
        props.showmsg("Invalid Credentials","danger");
      }
  }

  const onChange= (e) =>{                                                    //this is fucntion is one of its kind
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div>

<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputuserid1" className="form-label">userid address</label>
    <input type="userid" className="form-control" value={credentials.userid} onChange={onChange} id="userid" name="userid" aria-describedby="useridHelp"/>
    <div id="useridHelp" className="form-text">We'll never share your userid with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name ="password" />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Userlogin

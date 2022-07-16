import React from 'react';
import '../styles/create.css';
import {Context} from "../context/Context.js";
import axios from 'axios';
import Navbar from './Navbar';
function Create()
{
  const [title,settitle]=React.useState("");
  const [desc,setdesc]=React.useState("");
  const [file,setfile]=React.useState(null);
  const {user,logged}=React.useContext(Context);
  console.log(logged);
  const handle=async(e)=>
  {
    e.preventDefault();
    const postN={
      username:user,
      title:title,
      description:desc,
    };
    if(file)
    {
      const data=new FormData();
      const fname=Date.now()+file.name;
      data.append("name",fname)
      data.append("file",file)
      postN.photo=fname
      try{
        await axios.post("/upload",data);
      }
      catch(err)
      {

      }
    }
    try{
     const res=await axios.post('/blogs',postN
    )
     console.log(res)
     window.location.replace("/");
    }
    catch(err)
    {
     console.log(err);
    }
  }
    return (
       <>
       <Navbar/>
        <div className="write">
          {file&&(<img
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt=""/>)}
          <form className="writeForm" onSubmit={handle}>
            <div className="writeFormGroup">
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
              </label>
              <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e)=>setfile(e.target.files[0])}/>
              <input
                className="writeInput"
                placeholder="Title"
                type="text"
                autoFocus={true}
                onChange={(e)=>settitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                className="writeInput writeText"
                placeholder="Share Your Story..."
                type="text"
                autoFocus={true}
                onChange={(e)=>setdesc(e.target.value)}
              />
            </div>
            <button className="writeSubmit" type="submit">
              PUBLISH
            </button>
          </form>
        </div>
        </>
      );
}

export default Create;
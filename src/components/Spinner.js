import React, { Component } from "react";
import loading from "./loading.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center" style={{width:'100%',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',position:'sticky',zIndex:'5'}}>
        <img src={loading} alt="loading" style={{width:'200px'}}/>
        <br />
        <p className="tex" style={{color:'white'}}>whooosh you've reached the end..</p>
      </div>
    );
  }
}

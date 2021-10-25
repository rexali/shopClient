import React, { useState } from 'react';

function VendorShip(props) {
    let [data, setData] = useState([]);

    const addStateFees = () => {
        setData([...data,1])
      }
    
      const removeStateFee = (evt) => {
        evt.target.parentNode.remove();
      }
    
      const handleSubmit = () =>{
    
        var stateArr=[];
        var feeArr=[];
        var states = document.getElementsByName('state');
        var fees = document.getElementsByName('fee');
    
        for (let i = 0; i < states.length; i++) {
          stateArr.push(states[i].value);
          feeArr.push(fees[i].value);
        }    
    
        for (let i = 0; i < stateArr.length; i++) {
            // setTimeout(console.log,1000,stateArr[i], feeArr[i]);
            setTimeout(postStateFee,2000, stateArr[i], feeArr[i]);
        }    
      }
    
      function postStateFee(val1, val2) {
        fetch("/http://l0calhost:3333/users/shipper/", {
          mode: "cors",
          method: "post",
          body: { state: val1, fee: val2 }
        }).then((res)=>{
        console.log(res.json());
        }).catch((error)=>{
          console.log(error);
        })
      }

    return  (
    <div>
      <div className="text-right"><input type="button" value="Add" onClick={addStateFees} /></div>
      <div className="text-center"><input type="text" name="state" placeholder="Enter state" className="col-5 mr-1" /><input type="text" name="fee" placeholder="Enter fee" className="col-5 mr-1" /><input type="button" value="X" className="btn btn-sm btn-outline-success" /></div>
      {data.map((_,i)=>{
      return <div key={i} className="text-center"><input type="text" name="state" placeholder="Enter state" className="col-5 mr-1" /><input type="text" name="fee" placeholder="Enter fee" className="col-5 mr-1" /><input type="button" value="X" className="btn btn-sm btn-outline-success" onClick={(evt)=>removeStateFee(evt,i)} /></div>
      })}
      <div className="text-center"><input type="button" value="Submit" onClick={handleSubmit} /></div>
    </div>
    )
}
export default VendorShip;

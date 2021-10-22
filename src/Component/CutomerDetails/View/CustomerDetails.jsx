import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import { showAlert } from '../../../Common/CommonAlert';
import Spinner from 'react-spinner-material';
import Select from 'react-select';
import "../Css/Customer.css"
import "../../../css/main.css"
import "../../../css/react-confirm-alert.css";
import checkEmployeeDetails from '../../../services/checkEmployeeDetails'
import {setEditDetils, setAuth} from '../../../reducer/action'
import Logout from '../../Logout/View/Logout'

const CustomerDetails=()=>{
  const  [loading,setLoading] = useState(false)
  const  [userName,setUserName] = useState([])
  const [valueId,setValueId] =useState([])
  const [employeeDetails,setEmployeeDetails] = useState([])
  const [{employeeEditDetails,userList}, dispatch] = useGlobalState();
  const history = useHistory()
  const [userIdes,setUserId] = useState(employeeEditDetails.userId)

useEffect(()=>{
if(userIdes){
  var temp3 = {
        id:"",
        label: "",
        value: ""
      };
    temp3.id=employeeEditDetails.userId
    temp3.label = employeeEditDetails.empID
    temp3.value =employeeEditDetails.empID
//    setValueId(temp3);
// generateUserDetails()
}
},[])

useEffect(()=>{


  
  console.log(`userList`,userList)
for(let  k=0;k<userList.length;k++){

    var temp2 = {
      id:"",
      label: "",
      value: ""
    };
    temp2.id = userList[k].userid
    temp2.label = userList[k].username
    temp2.value =userList[k].username

    userName.push(temp2);
  }
 

},[userList])


const   equipmentcategory = (e) => {
  
    if (e != null) {
      setValueId(e)
      let flagsym = []
      for (var i = 0; i < userList.length; i++) {
        userList[i].userid.trim() === e.id.trim() ? flagsym.push(userList[i].userid) : setUserId([])
      }
      setUserId(flagsym.toString())
     console.log(`userId`,userIdes)
    }
  }

const  generateUserDetails =async(e)=>{
setEmployeeDetails([])

if(userIdes!=''){
setLoading(true)
const  getEmployeeDetails = await checkEmployeeDetails(userIdes)
console.log(`reponse fromkaran`,getEmployeeDetails)
setLoading(false)
if(getEmployeeDetails==1001){
  showAlert("Session Expire")
  dispatch(setAuth(false))
}
else{
if(getEmployeeDetails.errorCode=="00"){
setEmployeeDetails(getEmployeeDetails.detailslist)
}
else{
showAlert(getEmployeeDetails.errorMsg)
}
}
}
else{
  showAlert("Please select the user.")
}


}



const  callEditPage =(e,date, newCustomerCount, repeastCustomerCount, totalCustomerCount, remarks,status)=>{
let editDetails={
  date :date,
  newCustomerCount:newCustomerCount,
  repeastCustomerCount:repeastCustomerCount,
  totalCustomerCount:totalCustomerCount,
  remarks:remarks,
  empID:valueId.value,
  status:status,
  userId:userIdes.toString()
}
console.log(`editDetails`,editDetails)
dispatch(setEditDetils(editDetails))
dispatch(setAuth(true))
history.push('/EditDetails')
}


return(
<div>
<Logout  props={"Edit"}/>
<div className="col-xs-22 col-sm-3 col-md-3 col-lg-3 mt-xs-10 mt-30"> <b>Select User Id</b><br />
<Select class="form-control"  
                        onChange={(e)=>equipmentcategory(e)}
                        id="equipmentcategory123"
                       options={userName}
                        value={valueId}
                      
                        theme={theme => ({
                          ...theme,

                          colors: {
                            primary25: 'white',
                            primary: 'rgb(255, 255, 255)',
                          },
                        })}
                      />

<button  type="button"  className="btn btn-primary mt"   id="genratebtn"  style={{ width: "60%" }} 
                  onClick={(e) => generateUserDetails(e)}
                 disabled={loading}
                >Generate</button>
           </div>








<div>
<div className="mt">

<div className="tbl-holder">

  <div className="spin">
    <Spinner visible={loading}
      spinnerColor={"rgba(0, 0, 0, 0.3)"} />
  </div>
<table className="table table-striped table-advance table-hover table-bordered tbl-task  tbl-hhide">

<thead>

  <tr >
    <th>Date</th>
    <th>New  Customer Count</th>
    <th>Repeat Customer Count</th>
    <th>Total Customer Count</th>
    <th>Remarks</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>
</table>
<table className="table table-striped table-advance table-hover table-bordered tbl-task mob-tbl" >

<tbody>
{employeeDetails.map(function (item, key) {
  return(
  <tr key={key}>
    <td data-th="Date">{item.date}</td>
  <td data-th="New">{item.newCustomerCount}</td>
  <td data-th="Repeat">{item.repeastCustomerCount}</td>
  <td data-th="Total">{item.totalCustomerCount}</td>
  <td data-th="Remarks">{item.remarks}</td>
  <td data-th="Status">{item.status}</td>
  <td data-th="Edit"><a href="javascript:void(0)" onClick={(e)=>callEditPage(e, item.date, item.newCustomerCount, item.repeastCustomerCount, item.totalCustomerCount, item.remarks,item.status)} className="black-text" > Edit</a></td>
 </tr>
 )
})}
 
  </tbody>
</table>


</div>
</div>
</div>
</div>
)
}

export default CustomerDetails
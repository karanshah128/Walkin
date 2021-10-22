import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import { showAlert, showSuccess } from '../../../Common/CommonAlert';
import Spinner from 'react-spinner-material';
import "../Css/EditDetails.css"
import "../../../css/main.css"
import "../../../css/react-confirm-alert.css";
import callUpdateUser from '../../../services/callUpdateUser'
import Logout from '../../Logout/View/Logout'
import { setAuth } from '../../../reducer/action';


const EditDetails = () => {
  const history = useHistory()
  const [{ employeeEditDetails }, dispatch] = useGlobalState();
  const [newCustCount, setNewCustCount] = useState(employeeEditDetails.newCustomerCount)
  const [repeatCustCount, setRepeatCustCount] = useState(employeeEditDetails.repeastCustomerCount)
  const [totalCustomerCount, setTotalCustomerCount] = useState(employeeEditDetails.totalCustomerCount)
  const [remarks, setRemarks] = useState(employeeEditDetails.remarks)
  const [status, setStatus] = useState(employeeEditDetails.status)
  const [loading, setLoading] = useState(false)

  const updateUserDetails = async () => {

    if (newCustCount && repeatCustCount) {
      let updateDetails = {

        "empID": employeeEditDetails.userId,
        "date": employeeEditDetails.date,
        "newCustomerCount": document.getElementById("newCount").value,
        "repeastCustomerCount": document.getElementById("repeatCount").value,
        "totalCustomerCount": document.getElementById("totalCount").value,
        "remarks": remarks

      }

      setLoading(true)
      const checkUpdateDetails = await callUpdateUser(updateDetails)
      setLoading(false)
      if (checkUpdateDetails == 1001) {
        showAlert("Session Expire")
        dispatch(setAuth(false))
      } else {
        if (checkUpdateDetails.errorCode == "00") {

          showSuccess(checkUpdateDetails.errorMsg)
          dispatch(setAuth(true))
          history.push('./CustomerDetails')
        }
        else {
          showAlert(checkUpdateDetails.errorMsg)
        }

      }
    }
    else {
      showAlert("Please enter the required fields")
    }
  }




  useEffect(() => {
    let total = parseInt(newCustCount) + parseInt(repeatCustCount)
    setTotalCustomerCount(total)
  }, [newCustCount, repeatCustCount])

  const setCustomerValue = (e, param) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      if (param === "Customer") {

        setNewCustCount(e.target.value)

      }
      else {

        setRepeatCustCount(e.target.value)


      }


    }


  }


  const cancelUserDetails = () => {
    dispatch(setAuth(true))
    history.push('./CustomerDetails')
  }

  return (

    <div>
      <Logout props={"Edit"} />
      <div className="spin">
        <Spinner visible={loading} spinnerColor={"rgba(0, 0, 0, 0.3)"} />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 mt-30">
        <label>Date</label>
        <br />
        <input type="text" className="form-control" size="16" value={employeeEditDetails.date} disabled="disabled" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <label>New Customer Count</label>
        <br />
        <input type="text" className="form-control" onChange={(e) => setCustomerValue(e, "Customer")}
          value={newCustCount}
          id="newCount" autoComplete="off" maxlength="3" pattern="^[1-9]\d*$" />
      </div>


      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <label>Repeat Customer Count</label>
        <br />
        <input type="text" className="form-control" onChange={(e) => setCustomerValue(e, "Repeat")} value={repeatCustCount}
          id="repeatCount" autoComplete="off" maxlength="3" pattern="^[1-9]\d*$" />
      </div>

      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <label>Total Customer Count</label>
        <br />
        <input type="number" className="form-control"
          value={totalCustomerCount} id="totalCount" autoComplete="off" maxlength="250" disabled="disabled" />
      </div>


      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <label>Remarks</label>
        <br />
        <input type="text" className="form-control" value={remarks} id="remarks" autoComplete="off" maxlength="250" onChange={(e) => setRemarks(e.target.value)} />
      </div>



      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <button type="button" className="btn btn-primary mt" id="updatebtn" style={{ width: "40%" }}
          onClick={(e) => updateUserDetails(e)} disabled={loading}>Update</button>

        <button type="button" className="btn btn-primary mt margin-left" id="cancelbtn" style={{ width: "40%" }}
          onClick={(e) => cancelUserDetails(e)}>Cancel</button>

      </div>
    </div>

  )
}


export default EditDetails
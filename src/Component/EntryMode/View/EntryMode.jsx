import React, { useState, useEffect } from 'react';
import useGlobalState from '../../../Context';
import Spinner from 'react-spinner-material';
import "../Css/EntryMode.css"
import "../../../css/main.css"
import { confirmAlert } from "react-confirm-alert";
import "../../../css/react-confirm-alert.css";
import checkEntryMode from '../../../services/checkEntryMode'
import { showAlert, showSuccess, ConvertDate } from '../../../Common/CommonAlert';
import { setAuth, setEntryUsers, setEntryDate, setFlag, setRemark } from '../../../reducer/action'
import Logout from '../../Logout/View/Logout'
import callUpdateMethod from '../../../services/callUpdateMethod'
import { Scrollbars } from 'react-custom-scrollbars';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const EntryMode = () => {
  const [loading, setLoading] = useState(false)
  const [{ entryUser, date, flag, remark }, dispatch] = useGlobalState();
  const [newArray, setNewArray] = useState([])
  const [dateValue, setDateValue] = useState(new Date())
  // useEffect(() => {
  //   checkUser(ConvertDate(fromDate))
  // }, [])

  useEffect(() => {
    setNewArray(entryUser)
  }, [entryUser])



  const checkUser = async (date) => {
    dispatch(setEntryUsers([]))

    const checkEntry = await checkEntryMode(date)
    if (checkEntry == 1001) {
      showAlert("Session Expire")
      dispatch(setAuth(false))
    }
    else {
      if (checkEntry.errorCode == "00") {
        dispatch(setAuth(true));
        dispatch(setEntryUsers(checkEntry.employeedetails))
        dispatch(setEntryDate(checkEntry.date))
        dispatch(setFlag(checkEntry.employeedetails[0].status))
        dispatch(setRemark(checkEntry.remarks))


      }
      else {
        showAlert(checkEntry.errorMsg)

      }
    }

  }

  const callEditFunction = (e, key, params) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      const d = [...newArray]
      if (params === "new") {
        d[key].newCustomerCount = e.target.value;
      }
      else {
        d[key].repeastCustomerCount = e.target.value;
      }
      d[key].totalCustomerCount = parseInt(d[key].newCustomerCount) + parseInt(d[key].repeastCustomerCount)
      setNewArray(d)
      console.log(`main aray`, newArray)

    }

  }

  const onUpdateAll = async (e) => {
    var a = 0;
    for (let h = 0; h < newArray.length; h++) {
      if (newArray[h].newCustomerCount === "" || newArray[h].repeastCustomerCount === "") {
        a = a + 1;
        break
      }
      else {
        a = 0
      }
    }
    if (a == 0) {
      setLoading(true)
      const updateall = await callUpdateMethod(date, newArray)
      setLoading(false)
      if (updateall == 1001) {
        showAlert("Session Expire")
        dispatch(setAuth(false))
      }
      else {
        if (updateall.errorcode == "00") {
          showSuccess(updateall.errormsg)
          dispatch(setEntryUsers([]))
        }
        else {
          showAlert(updateall.errormsg)
        }
      }

    }
    else {
      showAlert("Please enter all the fields.")

    }

  }

  const setValue = () => {

    checkUser(ConvertDate(dateValue))
  }


  const handleDateChangeRawe = (e) => {
    e.preventDefault()
  }

  return (

    <div>
      <Logout props={"Entry"} />
      <div>
        <div className="mt-entry">

          <div class="col-md-3 col-lg-3 col-sm-3 col-xs-12" style={{ "font-weight": "bold", float: "left" }}>Date:
         <DatePicker className="form-control" dateFormat="dd-MMM-yyyy" id="date" autoComplete="off"
              selected={dateValue}
              maxDate={new Date()}
              onChange={(e) => setDateValue(e, dispatch(setEntryUsers([])))} onChangeRaw={(e) => handleDateChangeRawe(e)} />
          </div>



          <div class="col-md-3 col-lg-3 col-sm-3 col-xs-12" style={{ float: "left" }}>
            <button type="button" className="btn btn-primary" id="fetchbtn" style={{ width: "50%", marginLeft: "10px" }} onClick={() => setValue()} disabled={loading}>Fetch</button>

          </div>

          {remark ?
            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12" style={{ float: "left", fontWeight: "bold" }}>
              <label>Remark :<span style={{ "color": "red" }}>{remark}</span></label>
            </div> : ''}

          <div className="clearfix"></div>
          <div className="tbl-holder">

            <div className="spin">
              <Spinner visible={loading}
                spinnerColor={"rgba(0, 0, 0, 0.3)"} />
            </div>

            <table className="table table-striped table-advance table-hover table-bordered tbl-task  tbl-hhide">
              <thead>

                <tr >
                  <th>Userid</th>
                  <th>Username</th>
                  <th>New  Customer Count</th>
                  <th>Repeat Customer Count</th>
                  <th>Total Customer Count</th>

                </tr>
              </thead>
            </table>
            <Scrollbars style={{ height: 420 }}>

              <table className="table table-striped table-advance table-hover table-bordered tbl-task mob-tbl" >

                <tbody>
                  {
                    newArray.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td data-th="Date">{item.userid}</td>
                          <td data-th="Username">{item.username}</td>
                          {item.status === "PENDING" ? <td data-th="New"><input type="text" value={item.newCustomerCount} maxlength="3" onChange={(e) => callEditFunction(e, key, "new")} pattern="^[1-9]\d*$" /></td> : <td data-th="New">{item.newCustomerCount}</td>}
                          {item.status === "PENDING" ? <td data-th="Repeat"><input type="text" value={item.repeastCustomerCount} maxlength="3" onChange={(e) => callEditFunction(e, key, "rpt")} pattern="^[1-9]\d*$" /></td> : <td data-th="Repeat">{item.repeastCustomerCount}</td>}
                          <td data-th="Total">{item.totalCustomerCount}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </Scrollbars>

          </div>
        </div>
      </div>
      {flag === "PENDING" ?
        <button type="button" className="btn btn-primary mt ml-100 btn-css" onClick={(e) => onUpdateAll(e)}>Update All </button> : ''}
    </div>
  )
}

export default EntryMode
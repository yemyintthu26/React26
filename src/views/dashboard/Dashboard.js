import React, { useState, lazy, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router';
import ApexCharts from 'apexcharts';
import { ApiRequest } from '../common/ApiRequest';
import NPagination from '../common/pagination/NPagination';

const Dashboard = () => {

  const history = useHistory();
  
  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`)
    if (flag == "true") {
      console.log("Login process success")
      search();
    } else {
      history.push(`/Login`);
    }

  }, [])

  const [currentPage, setCurrentPage] = useState(); // for user list table current page
  const [admin, setAdmin] = useState([])
  const [total, setTotal] = useState(""); // total rows
  const [lastPage, setLastPage] = useState(""); // for user list table last page
  const pagination = (i) => {
    setCurrentPage(i);
    search(i);
  }//pagination
 
console.log(admin)
const search = async (page = 1) => {

  let search = {
    method: "get",
    url: `admin/get?page=${page}`,
  };
  let response = await ApiRequest(search);
  if (response.flag === false) {
    setAdmin([]);
  } else {
    if (response.data.status === "OK") {
      setAdmin(response.data.data.data);
      setCurrentPage(response.data.data.current_page);
      setLastPage(response.data.data.last_page);
      setTotal(response.data.data.total);
    } else {
      setAdmin([]);
    }
  }
}


  return (
    <>
    <CRow className="mt-3">
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <h4 className='m-0'>Admin List</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  {admin.length > 0 && (
                    <>
                      <p className='mb-0 font-weight-bold' align='right'>Total : {total} row(s)</p>
                      <div className='overflow'>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th className="text-center" width={80} >No</th>
                              <th className='text-center' width={160}>UserName</th>
                              <th className='text-center' width={160}>UserCode</th>
                              <th className='text-center' width={160}>Password</th>
                            </tr>
                          </thead>
                          <tbody>
                            {admin.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td width={50} className="text-center">{index + 1}</td>
                                  <td className="text-center" width={120}>{data.name}</td>
                                  <td className="text-center" width={120}>{data.user_code}</td>
                                  <td className="text-center" width={120}> {data.password}</td>
                                  <td style={{ border: "0px solid" , textAlign:"center"}}>
                                  <div className="user-before">
                              </div>
                              </td>  
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {total > 10 &&
        <NPagination
          activePage={currentPage}
          pages={lastPage}
          currentPage={currentPage}
          totalPage={lastPage}
          pagination={pagination}
        />
      }
    </>
  )
}

export default Dashboard

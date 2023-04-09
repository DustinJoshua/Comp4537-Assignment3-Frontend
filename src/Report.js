import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function Report({ id, accessToken, setAccessToken, refreshToken }) {
  const [reportTable, setReportTable] = useState(null);

  const axiosToBeIntercepted = useMemo(() => {
    const instance = axios.create();

    instance.interceptors.request.use(async function (config) {
      const decoded = jwt_decode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        const res = await axios.post(
          'https://comp4537-assignment3-dustin-lott.onrender.com/requestNewAccessToken',
          {},
          {
            headers: {
              'auth-token-refresh': refreshToken,
            },
          }
        );
        setAccessToken(res.headers['auth-token-access']);
        config.headers['auth-token-access'] = res.headers['auth-token-access'];
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    async function fetchReport() {
      const res = await instance.get(
        `https://comp4537-assignment3-dustin-lott.onrender.com/report?id=${id}`,
        {
          headers: {
            'auth-token-access': accessToken,
          },
        }
      );
      setReportTable(res.data);
    }

    fetchReport();

    return instance;
  }, [id, accessToken, refreshToken, setAccessToken]);

  let reportTitle = '';
  let reportContent = null;

  if (reportTable) {
    reportTitle = reportTable.title;
    switch(reportTitle) {
      case 'Unique API users over a period of time':
        reportContent = (
          <ul>
            {reportTable.data.map((item, index) => (
              <li key={index} className='second-row'>
                {item._id.year}-{item._id.month}-{item._id.day}--{item._id.hour}:00: {item.uniqueUsers} unique API users
              </li>
            ))}
          </ul>
        );
        break;
      case 'Top API users over a period of time':
        reportContent = (
          <ul>
            {reportTable.data.map((item, index) => (
              <li key={index} className='second-row'>
                Name: {item._id ? item._id : 'null'}, Count: {item.count}
              </li>
            ))}
          </ul>
        );
        break;
        case 'Top users for each Endpoint':
          reportContent = (
            <ul>
              {reportTable.data.map((item, index) => (
                <li key={index} className='zero-row'>
                  Endpoint: {item._id ? item._id : 'null'}
                  <ul>
                    {item.topUsers.map((user, index) => (
                      <li key={index} className='second-row'>
                        Name: {user.user ? user.user : 'null'}, Count: {user.count}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          );
          break;
        case '4xx Errors By Endpoint':
          reportContent = (
            <ul>
              {reportTable.data.map((item, index) => (
                <li key={index} className='zero-row'>
                  Endpoint: {item._id ? item._id : 'null'}
                  <ul>
                    {item.errors.map((error, index) => (
                      <li key={index} className='error-row'>
                        Status: {error.status}, Count: {error.count}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          );
          break;
        case 'Recent 4xx/5xx Errors':
          reportContent = (
            <ul>
              {reportTable.data.map((item, index) => (
                <li key={index} className='zero-row'>
                  Endpoint: {item._id ? item._id : 'null'}
                  <ul>
                    {item.errors.map((error, index) => (
                      <li key={index} className='error-row'>
                        Status: {error.status}, Count: {error.count}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul> 
          );
          break;

      default:
        reportContent = null;
    }
    
  }

  return (
    <div>
      <h2>{reportTitle}</h2>
      {reportContent}
    </div>
  );
}



//   return (
//     <div>
//       Report {id}
//       {
//           (reportTable) &&
//         reportTable
//       }
//     </div>
//   )
// }

export default Report

  // useEffect(() => {
  //   async function fetchReport() {
  //     const res = await axiosToBeIntercepted.get(`http://localhost:5001/report?id=${id}`
  // , {
  //     headers: { 
  //       'auth-token-access': accessToken
  //     }
  // })
  //   setReportTable(res.data)
  // }
  //   fetchReport()
  // }, [id, accessToken, axiosToBeIntercepted])
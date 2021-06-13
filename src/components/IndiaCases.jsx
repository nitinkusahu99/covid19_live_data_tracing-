import React, { useEffect, useState, lazy, Suspense } from 'react'
import '../App.css'
import { FiArrowUp } from 'react-icons/fi'
import { GoArrowDown } from 'react-icons/go'
import { Table, Spinner } from 'react-bootstrap'
const IndiaCard = lazy(() => import('../components/IndiaCard'))
function IndiaCases() {
  const [state, setState] = useState([])
  const [spin, setspin] = useState(true)
  const [india, setindia] = useState([])
  let mydata = state
  useEffect(() => {
    fetch('https://api.covid19india.org/data.json').then((res) => {
      res.json().then((result) => {
        setState(result.statewise)
        setspin(false)
        setindia(result.statewise[0])
      })
    })
  }, [])
  return (
    <>
      <section>
        <Suspense fallback={<div>loading...</div>}>
          <IndiaCard data={india} />
        </Suspense>

        <h2
          id="section"
          className="fw-bolder text-secondary text-center mt-5 mb-3"
        >
          Search by states
        </h2>

        <div style={{ float: 'right', color: 'black' }}>
          <a href="#down_section">
            <GoArrowDown />
          </a>
        </div>

        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>state</th>
              <th>Active</th>
              <th>recovered</th>
              <th>Deaths</th>
              <th>total cases</th>
              <th>last updated</th>
            </tr>
          </thead>
          <tbody>
            {mydata.map((item, index) => (
              <tr key={index} className="text-white">
                <td style={{ backgroundColor: 'purple' }}>{index + 1}</td>
                <td className="bg-success">{item.state}</td>
                <td className="bg-primary">{item.active}</td>
                <td className="bg-secondary">{item.recovered}</td>
                <td className="bg-danger">{item.deaths}</td>
                <td className="bg-warning">{item.confirmed}</td>
                <th className="bg-info">{item.lastupdatedtime}</th>
              </tr>
            ))}
          </tbody>
        </Table>
        {spin === true ? (
          <div className="text-center">
            <Spinner animation="border" variant="info" />
          </div>
        ) : null}
      </section>
      <p id="down_section" className="vert-move">
        <a href="#covid19-meter">
          Covid19 meter <FiArrowUp />
        </a>
      </p>
    </>
  )
}

export default IndiaCases

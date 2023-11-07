import React from 'react'

export default function TaskCards() {
  return (
    <>
         <div className='grayLine'>
      <div></div>
      <div></div>
    </div>
    < div className = "mb-3" style={{ height : '15vh'}} > 
    <div className="row g-0">
        <ul className="col-md-2 rounded-end">
            <p className="rounded-end" style={{background : 'green' }}>18</p>
            <b>Aug</b>
            <p><small>Mon</small></p>
            </ul>
            <div className="col-md-9">
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a</p>
                </div>
            </div>
            <div className="col-md-1">
            <div className="dropdown">
                <button
                    className=" dropdown-toggle noBtn"
                    type="button"
                    data-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false">
                        <p>...</p>
                </button>
                <div className="dropdown-menu">
                    <a href="http://" rel="noopener noreferrer">Action</a>
                    <a href="http://" rel="noopener noreferrer">Another action</a>
                    <a href="http://" rel="noopener noreferrer">Something else here</a>
                </div>
            </div>

            </div>

        </div>
    </div>
 
    </>
  )
}

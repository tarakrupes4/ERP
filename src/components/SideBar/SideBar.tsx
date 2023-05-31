import React from 'react'
import './SideBar.css'
function SideBar() {
  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="/inward">Inward</a>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
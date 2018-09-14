import React from 'react'
import {Link} from 'gatsby'

const Navbar = () => (
    <nav className="navbar is-transparent">
        <div className="container">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <h1 className="has-text-weight-bold is-size-2">Ross Crane</h1>
                </Link>
            </div>
            <div className="navbar-start">
                <Link className="navbar-item" to="/about">
                    About
                </Link>
                <Link className="navbar-item" to="/photos">
                    Photos
                </Link>
                <Link className="navbar-item" to="/contact">
                    Contact
                </Link>
            </div>
            <div className="navbar-end">

            </div>
        </div>
    </nav>
)

export default Navbar

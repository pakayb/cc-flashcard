import React from "react";
import {Link} from "react-router-dom";

function Nav() {
    return(
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link to='/learn'><li>Learn</li></Link>
                <Link to='/game'><li>Play</li></Link>
                <Link to='/admin'><li>Upload</li></Link>
            </ul>
        </nav>
    )
}

export default Nav;
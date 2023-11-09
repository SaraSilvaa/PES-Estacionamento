import React, { useState } from "react";
import './header.css'; // Importe o arquivo CSS diretamente
import { FaBars } from 'react-icons/fa'

const Header = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSlidebar = () => setSidebar(!sidebar)

    return (
        <div className="Container"> { }
            <FaBars className="svg" onClick={setSidebar}/>
           {sidebar && <sidebar active={setSidebar} /> }
        </div>
    )
}

export default Header

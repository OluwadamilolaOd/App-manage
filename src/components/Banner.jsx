import { useState } from 'react'
import Button from './Button'
import './Styles/banner.css'

const Banner = ({title, btnClassname, btntitle, isbtn}) => {

  //const {isbtn, usebtn} = useState(false)
  return (
    <div className="banner">
        <div className="wrapper">
         <div className="maincontent">
         <img src="" alt="" />
            <h1>{title}</h1>
         </div>
          {isbtn ? <Button className={btnClassname} title={btntitle} /> : <></> }
            
        </div>
    </div>
  )
}

export default Banner
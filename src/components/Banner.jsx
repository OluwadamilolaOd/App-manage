import Button from './Button'
import './Styles/banner.css'

const Banner = ({title}) => {
  return (
    <div className="banner">
        <div className="wrapper">
         <div className="maincontent">
         <img src="" alt="" />
            <h1>{title}</h1>
         </div>

            <Button className={"btnwhite"} title={"Hello button"} />
        </div>
    </div>
  )
}

export default Banner
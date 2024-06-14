import { Link } from 'react-router-dom'

const Error = () =>{
  return (
    <div>
      <h3>It seems that it is not the Pokepage you were looking for</h3>
      <Link to="/"><button className="btn-logout" >Back to home</button></Link>
    </div>
  )
}

export default Error;
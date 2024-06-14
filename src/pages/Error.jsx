import { Link } from 'react-router-dom'

const Error = () =>{
  return (
    <div>
      <h2>Parece que no es la Pokepágina que buscabas</h2>
      <Link to="/"><button className="btn-logout" >Volver al inicio</button></Link>
    </div>
  )
}

export default Error;
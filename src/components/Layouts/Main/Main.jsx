import React, {useState, useEffect} from 'react'
import { Imagen } from '../../UI/Imagen/Imagen'
import { Parrafo } from '../../UI/Parrafo/Parrafo'

export const Main = () => {

  let url="https://rickandmortyapi.com/api/character/"

  const [todos, setTodos] = useState()
  const [nombre, setNombre] = useState()

  const fetchApi=async(urlModificada)=>{
    const response = await fetch(urlModificada)
    const responseJSON = await response.json()
    setTodos(responseJSON.results)
  }

  const mostrarContenido = (evento) =>{
    setNombre(evento.target.value)
    if(evento.keyCode===13){
      url="https://rickandmortyapi.com/api/character/?name="+nombre
      fetchApi(url)
    }
  }

  useEffect(()=>{
    fetchApi(url)
  },[])

  return (
    <div className='main'>
      <div className='contenedorInput'>
        <input id="input" type="text" onKeyDown={mostrarContenido} placeholder="Nombre del personaje"></input>
      </div>
      <br/>
        <div className='contenedorCard'>
        {!todos ? 'No existe' :
          todos.map((todos, index)=>{
          return (
            <div key={index} className="cajaCard">
              <div className='boxImagen'>
                <Imagen url={todos.image}/>
              </div>
              <div className='boxParrafo'>
                <Parrafo contenido={todos.name}/>
                <Parrafo id="parrafo2" contenido={todos.species}/>
              </div>
            </div>
          )
        })}
        </div>
    </div>
  )
}

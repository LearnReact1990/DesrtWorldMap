import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect, useRef } from "react"
import Axios from "axios"

export default function Button({ ZoomToPlace, setExpand }) {
  const [desertPlaces, setDesertPlaces] = useState([])

  let inputText = useRef()

  const [desertDetails, setDesertDetails] = useState([])

  useEffect(() => {
    const getAllJson = async () => {
      const responce = await Axios.get("https://raw.githubusercontent.com/LearnReact1990/Test/master/osmway-desert.geojson")
      const geoJSONArry = responce.data

      console.log("Returned Result")
      console.log(geoJSONArry.features)
      //desertPlaces = geoJSONArry.features
      setDesertPlaces([...geoJSONArry.features])
      console.log(desertPlaces)
      //setDesertDetails(arrys)
      //console.log(desertDetails)
      // console.log(geoJSONArry.features[0].properties.Name)
      // console.log(geoJSONArry.features[0].geometry.coordinates)
    }

    getAllJson()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    console.log(desertPlaces)

    const searchValue = e.target.value.toLowerCase()

    const arr = desertPlaces.filter((element) => {
      if (element.properties) {
        return element.properties.Name.toLowerCase().includes(searchValue)
      } else {
        return false
      }
    })

    console.log(arr)
    setDesertDetails(arr)
    console.log(arr)
  }

  const loadPlace = (e, name, key) => {
    e.preventDefault()
    console.log(name)
    const logitude = desertDetails[key].geometry.coordinates[0]
    const longitude = desertDetails[key].geometry.coordinates[1]

    console.log(logitude + "::" + longitude)

    ZoomToPlace(logitude, longitude)

    setDesertDetails([])
    inputText.current.value = name
  }
  return (
    <>
      <div className="container mt-2 ml-2serach-bar-dropdown" style={{ width: 300 }}>
        <input type="text" ref={inputText} className="form-control" placeholder="Search Desert" onChange={handleSearch} />
        <ul className="list-group">
          {desertDetails.map((desert, key) => {
            console.log("Inside" + desert.properties.Name)
            return (
              <button type="button" onClick={(e) => loadPlace(e, desert.properties.Name, key)} className="list-group-item list-group-item-action">
                {desert.properties.Name}
              </button>
            )
          })}
        </ul>
      </div>
    </>
  )
}

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"

export default function Button() {
  const desertPlaces = [{ Name: "Sahara Desert" }, { Name: "Sand Desert" }]

  const [desertDetails, setDesertDetails] = useState([])

  const handleSearch = e => {
    e.preventDefault()
    console.log(e.target.value)

    const arr = desertPlaces.filter(element => {
      return element.Name.includes(e.target.value)
    })
    setDesertDetails(arr)
    console.log(arr)
  }

  return (
    <>
      <div className="container mt-2 ml-2serach-bar-dropdown" style={{ width: 300 }}>
        <input type="text" className="form-control" placeholder="Search Desert" onChange={handleSearch} />
        <ul className="list-group">
          {desertDetails.map(desert => {
            return (
              <button type="button" className="list-group-item list-group-item-action">
                {desert.Name}
              </button>
            )
          })}
        </ul>
      </div>
    </>
  )
}

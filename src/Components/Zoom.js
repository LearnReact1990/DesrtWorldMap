import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons"

export default function Zoom({ handleZoomIn, handleZoomOut, setHome }) {
  return (
    <>
      <FontAwesomeIcon icon={faHome} onClick={setHome} className="btn btn-default btn-lg p-3 border border-warning">
        Home
      </FontAwesomeIcon>
      <FontAwesomeIcon icon={faCirclePlus} onClick={handleZoomIn} className="btn btn-default btn-lg p-3 border border-warning">
        Zoom In
      </FontAwesomeIcon>
      <FontAwesomeIcon icon={faCircleMinus} onClick={handleZoomOut} className="btn btn-default btn-lg p-3 border border-warning">
        Zoom Out
      </FontAwesomeIcon>
    </>
  )
}

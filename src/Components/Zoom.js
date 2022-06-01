export default function Zoom({ handleZoomIn, handleZoomOut, setHome }) {
  return (
    <>
      <button onClick={setHome}>Home</button>
      <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
    </>
  )
}

import { loadModules } from "esri-loader"

import React, { useEffect, useRef, useState } from "react"

import Button from "./Button"
import Zoom from "./Zoom"

const DefaultZoomValue = 5

const defatluInitialMapAxis = {
  defaultLongitute: -6.5532048,
  defaultLattiture: 29.7720485,
}

const MapPage = () => {
  const MAPDiv = useRef(null)
  const SearchBtn = useRef(null)
  const ZoomIn = useRef(null)

  const [ZoomValue, setZoomValue] = useState(DefaultZoomValue)
  const [defaultMapAxis, setDefaultMapAxis] = useState(defatluInitialMapAxis)

  const handleZoomIn = () => {
    setZoomValue(ZoomValue + 1)
  }

  const handleZoomOut = () => {
    setZoomValue(ZoomValue - 1)
  }

  const setHome = () => {
    setZoomValue(DefaultZoomValue)
    setDefaultMapAxis(defatluInitialMapAxis)
  }

  const ZoomToPlace = (logitude, lattitude) => {
    console.log("Zooming" + logitude + " " + lattitude)
    setZoomValue(15)
    setDefaultMapAxis({
      defaultLongitute: logitude,
      defaultLattiture: lattitude,
    })
  }

  useEffect(() => {
    let view

    loadModules(["esri/views/MapView", "esri/WebMap", "esri/layers/GeoJSONLayer", "esri/widgets/Expand"], { css: true }).then(([MapView, WebMap, GeoJSONLayer, Expand]) => {
      const webmap = new WebMap({
        basemap: "gray-vector", //"topo-vector"

        // autocasts as new PortalItem()
        // portalItem: {
        //   // get item id from the props
        //   id
      })
      const template = {
        title: "Desert Info",
        content: "Desert Name : {Name}",
        fieldInfos: [
          {
            fieldName: "time",
            format: {
              dateFormat: "short-date-short-time",
            },
          },
        ],
      }
      const renderer = {
        type: "simple",
        field: "Name",
        symbol: {
          type: "simple-marker",
          color: "orange",
          outline: {
            color: "white",
          },
        },
      }

      const geoJson = new GeoJSONLayer({
        // url: "https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson",
        //url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        //url: "https://raw.githubusercontent.com/apelserg/data-osm-getdata/master/geojson/osmway-desert.geojson",
        url: "https://raw.githubusercontent.com/LearnReact1990/Test/master/osmway-desert.geojson",
        popupTemplate: template,
        renderer: renderer,
      })

      webmap.add(geoJson)
      view = new MapView({
        map: webmap,

        // center: [-118.805, 34.027],
        center: [defaultMapAxis.defaultLongitute, defaultMapAxis.defaultLattiture],
        zoom: ZoomValue,
        container: MAPDiv.current,
      })

      const expand = new Expand({
        view: view,
        content: SearchBtn.current,
        expanded: true,
        expandIconClass: "esri-icon-search",
      })

      view.ui.add(expand, "top-right")
      view.ui.add(ZoomIn.current, "bottom-right")
    })

    // return () => {
    //   if (!view) {
    //     //view.destroy()
    //     view = null
    //   }
    // }
  })
  return (
    <div style={{ height: 800 }} ref={MAPDiv}>
      <div ref={SearchBtn}>
        <Button ZoomToPlace={ZoomToPlace} />
      </div>

      <div ref={ZoomIn}>
        <Zoom handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} setHome={setHome} />
      </div>
    </div>
  )
}

export default MapPage

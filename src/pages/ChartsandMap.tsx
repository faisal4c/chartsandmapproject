import React, { useEffect, useState } from "react";
import "./ChartsandMap.css";
import { Line } from "react-chartjs-2";

//chartjs imports
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

//leflet imports
import { MapContainer, TileLayer, Marker,Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);



export default function ChartsandMap() {

  const [label, setLabel] = useState([]);
  const [graphFetchedData, setGraphFetchedData] = useState();
  const [mapFetchedData, setMapFetchedData] = useState();
  const [dataPoints, setDataPoints] = useState([]);
  const [center, setCenter] = useState({ lat: 20, lng: 77 });
  const zoom = 3;

  useEffect(() => {
    const getGraphData = async () => {
      const res = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const data = await res.json();
      setGraphFetchedData(data);
    };
    getGraphData();
  }, []);

  useEffect(() => {
    const getMapData = async () => {
      const res = await fetch(
        "https://disease.sh/v3/covid-19/countries"
      );
      const data = await res.json();
      setMapFetchedData(data);
      
    };
    getMapData();
  }, []);

  useEffect(() => {
    if (graphFetchedData && graphFetchedData.cases) {
      let newLabel = [];
      let newDataPoints = [];
      for (let elem in graphFetchedData.cases) {
        newLabel.push(elem);
        newDataPoints.push(graphFetchedData.cases[elem]);
      }
      setLabel(newLabel);
      setDataPoints(newDataPoints);
    }
  }, [graphFetchedData]);

  useEffect(() => {

  }, [mapFetchedData]);

  let graphData = {
    labels: label,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: "#F8F8F9",
        pointBorderColor: "#111439",
      },
    ],
  };
  let graphOptions = {
    maintainAspectRatio: false,
  };

  //marker image
  const markerIcon = new L.Icon({
    iconUrl: require("../images/marker.png"),
    iconSize: [40,40],
  });

  return (
    <div className="chartsandmappage">
      <h1>faisal4c@gmail.com || 7838786969</h1>
      <h1>Covid Cases:</h1>
      <div className="lineChart">
        <Line data={graphData} options={graphOptions}></Line>
      </div>
      <h1>React Leaflet:</h1>

      <MapContainer center={center} zoom={zoom}>
        <TileLayer url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=fs1jVq0ksqjWTawZ8fnS" />
        {
          mapFetchedData && 
          mapFetchedData.map((elem)=>(
            <Marker position={[elem.countryInfo.lat, elem.countryInfo.long]} icon={markerIcon} key={Math.random()}>
            <Popup>
              Country Name: <span> {elem.country}</span><br /> 
              Active Cases: <span>{elem.active}</span>  <br /> 
              Recovered Cases: <span>{elem.recovered}</span> <br />
              Deaths: <span>{elem.deaths}</span> <br />
            </Popup>
          </Marker>
          ))
        }

      </MapContainer>
    </div>
  );

}

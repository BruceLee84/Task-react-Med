import React from "react";
import { useState, useEffect } from "react";
import {useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer} from '@react-google-maps/api';


const containerStyle = {
    width: '700px',
    height: '600px'
  };
  
  const center = {
    // Latitude
    lat: 13.132117, 
    // Longitude  
    lng: 80.241964
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }


function Map(){

  // componentDidMount() {
  //   async watchPosition() {
  //     console.log('watchPosition');        
  //     await navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log('Position -> ',position);
  //         },
  //         (error) => console.log(error)
  //         {enableHighAccuracy: false, timeout: 50000}
  //     );
  // }

  // useEffect(() => {
  //    watchPosition(){
  //         console.log('watchPosition');        
  //         navigator.geolocation.getCurrentPosition(
  //             (position) => {
  //               console.log('Position -> ',position);
  //             },
  //             (error) => console.log(error)
  //             {enableHighAccuracy: false, timeout: 50000}
  //         );
  // }})

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey:'AIzaSyAxMFYz4brUdJr1tJRRuHBGksliTemZME4'
        })

        const [map, setMap] = React.useState(null)

        const onLoad = React.useCallback(function callback(map) {
          const bounds = new window.google.maps.LatLngBounds(center);
          map.fitBounds(bounds);
          setMap(map)
        }, [])
      
        const onUnmount = React.useCallback(function callback(map) {
          setMap(null)
        }, [])
      
        return isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={2}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
               {/* <Marker onLoad={onLoad} position={center}/> */}
              <></>
            </GoogleMap>
        ) : <></>
      }


export default Map
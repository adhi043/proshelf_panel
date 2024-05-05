import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import { Geocoder } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import MapContext from './MapContext';

const OpenMap = () => {
    const { setMapValue } = useContext(MapContext);
    const navigate = useNavigate();

    const libraries = ["places"];

    const [currentLocation, setCurrentLocation] = useState({
        lat: 31.5204,
        lng: 74.3587,
    });

    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [geocoder, setGeocoder] = useState(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        setCurrentLocation(pos);
                        getAddressFromLatLng(pos.lat, pos.lng);
                        map?.panTo(pos);
                    },
                    () => {
                        console.error("The Geolocation service failed.");
                    }
                );
            } else {
                console.error("Your browser doesn't support geolocation.");
            }
        };

        getCurrentLocation();
    }, [map]);

    useEffect(() => {
        if (map) {
            setGeocoder(new window.google.maps.Geocoder());
        }
    }, [map]);

    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    };

    const onPlaceChanged = () => {
        try{
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            setCurrentLocation({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
            setAddress(place.formatted_address || "");
            setCity(getCityFromPlace(place));
            map.panTo(place.geometry.location);
        } else {
            console.log("Autocomplete is not loaded yet!");
        }
        }catch(err){
            console.log(err);
        }
    };

    const onMapClick = (e) => {
        setCurrentLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
        map.panTo(e.latLng);
        getAddressFromLatLng(e.latLng.lat(), e.latLng.lng());
    };

    const getAddressFromLatLng = (lat, lng) => {
        if (geocoder) {
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        setAddress(results[0].formatted_address);
                        setCity(getCityFromResults(results));
                    } else {
                        console.error("No results found");
                    }
                } else {
                    console.error("Geocoder failed due to: " + status);
                }
            });
        }
    };

    const getCityFromResults = (results) => {
        for (let i = 0; i < results.length; i++) {
            for (let j = 0; j < results[i].address_components.length; j++) {
                const component = results[i].address_components[j];
                if (component.types.includes("locality")) {
                    return component.long_name;
                }
            }
        }
        return "";
    };

    const getCityFromPlace = (place) => {
        for (let i = 0; i < place.address_components.length; i++) {
            const component = place.address_components[i];
            if (component.types.includes("locality")) {
                return component.long_name;
            }
        }
        return "";
    };

    return (
        <div>
            <div className=" ">
                <LoadScript
                    googleMapsApiKey={'AIzaSyA0ezzOFq6lTHs4i4DlmMPJpV48LAWMx7o'}
                    libraries={libraries}
                >
                    <GoogleMap
                        mapContainerStyle={{
                            width: "100%",
                            height: "100vh",
                            paddingTop: "80px",
                        }}
                        center={currentLocation}
                        onClick={onMapClick}
                        zoom={15}
                        onLoad={(map) => setMap(map)}
                    >
                        <Marker
                            position={currentLocation}
                            icon={<i className='bi bi-pin-map-fill text-warning'></i>}
                        />
                        <div className="  bg-light  position-absolute top-25   w-25 rounded-3">
                            <Autocomplete
                                onLoad={onLoad}
                                onPlaceChanged={onPlaceChanged}
                                options={{}}
                            >
                                <input
                                    className="outline-none bg-white border w-100 p-2 px-3  text-textColor placeholder:text-gray-500 rounded-3"
                                    type="text"
                                    placeholder="Search Location"
                                />
                            </Autocomplete>
                        </div>
                        <div className='position-absolute' style={{ top: '20px', left: '35%', maxWidth: '470px' }}>
                            <div className=' bg-warning border border-dark set-shadow p-3 rounded-3 gap-2 mb-3 px-5 ps-3 mb-4 me-3'  >
                                <p>{address}</p>
                                <p><b>City:</b> {city}</p>
                                <p><b>Latitude:</b> {currentLocation?.lat}</p>
                                <p><b>Longitude:</b> {currentLocation?.lng}</p>
                                <div className='d-flex gap-3 align-items-center'>
                                    <div
                                        className='p-1 px-3 bg-light rounded-pill d-flex justify-content-center align-items-center set-shadow mt-3'
                                        style={{ cursor: 'pointer', width: '140px' }}
                                        onClick={() => { navigate(-1) }}
                                    >
                                        <h5 className='m-0 p-0'>Back</h5>
                                    </div>
                                    <div
                                        className='p-1 px-3 bg-light rounded-pill d-flex justify-content-center align-items-center set-shadow mt-3'
                                        style={{ cursor: 'pointer', width: '140px' }}
                                        onClick={() => {
                                            setMapValue({
                                                lat: currentLocation?.lat,
                                                lng: currentLocation?.lng,
                                                address: address,
                                                city: city
                                            })
                                            navigate(-1)
                                        }}
                                    >
                                        <h5 className='m-0 p-0'>Save</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )
}

export default OpenMap;

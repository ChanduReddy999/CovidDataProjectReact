import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Globe from 'react-globe.gl';
import * as topojson from 'topojson-client';
import NavBar from '../NavBar';
import './CovidVaccineByCountry.css';
import vaccineCountries from './vaccineCountries.json'


const CovidVisualsByCountry = () => {
    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: [] });
    const [countryData, setCountryData] = useState(null);

    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [clickedCountry, setClickedCountry] = useState(null);

    useEffect(() => {
        // Load country polygons from a TopoJSON file
        fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
            .then((res) => res.json())
            .then((worldData) => {
                const { features } = topojson.feature(worldData, worldData.objects.countries);
                // console.log('features',features);
                setCountries({ features });
            });
    }, []);

    useEffect(() => {
        // Auto-rotate globe
        const rotationSpeed = 0.5; // degrees per second
        const rotateGlobe = () => {
            if (globeEl.current && globeEl.current.controls() && globeEl.current.controls().rotation) {
                const { rotation } = globeEl.current.controls();
                rotation.y += (rotationSpeed * Math.PI) / 180;
                globeEl.current.controls().update();
            }
            requestAnimationFrame(rotateGlobe);
        };
        rotateGlobe();
    }, []);


    const handleCountryClick = (country) => {
        const countryName = country.properties.name;
        console.log("handlecountryName", countryName);

        fetchCountryData(countryName);
        setClickedCountry(country);
    };

    const fetchCountryData = async (countryName) => {
        try {
            // console.log("fetchCountryName", countryName);
            const data = await getMockCountryData(countryName);
            // console.log("Fetched Data:", data);

            if (Object.keys(data).length === 0) {
                console.warn("No data found for country:", countryName);
            }

            setCountryData(data);
        } catch (error) {
            console.error("Error fetching country data", error);
        }
    };

    const getMockCountryData = async (countryName) => {
        try {
            const OriginalCountryName = countryName
            console.log("oldName", OriginalCountryName);
            countryName = vaccineCountries[countryName];
            console.log("newCountryName", countryName);
            if (!countryName) {
                countryName = OriginalCountryName
            }
            const response = await axios.post('https://coviddataproject.onrender.com/prod/v1/covidvaccinecountrydata', { countryName });
            const result = response.data;
            const apiData = result.data || {};
            console.log("apiData", apiData);

            return apiData;
        } catch (error) {
            console.error("Error Fetching Data for Particular Country", error);
            throw error;
        }
    };

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.pointOfView({ altitude: 2.5 });
        }
    }, []);

    const handleCountryHover = (country) => {
        setHoveredCountry(country);
    };

    const getPolygonCapColor = (country) => {
        if (clickedCountry && country.properties.name === clickedCountry.properties.name) {
            return '#ff0000';
        }
        if (hoveredCountry && country.properties.name === hoveredCountry.properties.name) {
            return '#00ff00';
        }
        return '#2cabea';
    };

    // for overall vaccine data worldwide we used this function

    const [overAllData, setOveralldata] = useState([])
    useEffect(() => {
        getOverAllCovidViccineData();
    }, [])
    const getOverAllCovidViccineData = async () => {
        try {
            await axios.get("https://coviddataproject.onrender.com/prod/v1/covidvaccinedata").then(response => {
                const overAllVaccineData = response.data
                console.log("overalldatavaccine",overAllVaccineData.data);
                setOveralldata(overAllVaccineData.data)
            }).catch(error => {
                console.error("Error while fecthing data ", error);
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className='NavBarDivForWorldMapPage'>
                <NavBar />
            </div>
            <div className='globeMain'>
                <Globe
                    ref={globeEl}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    polygonsData={countries.features}
                    polygonCapColor={getPolygonCapColor}
                    polygonSideColor={() => '#ea2cab'}
                    polygonStrokeColor={() => '#5804e9'}
                    onPolygonClick={handleCountryClick}
                    onPolygonHover={handleCountryHover}
                />

                {countryData && (
                    <div className='ShowData'>
                        <h2>Country Data</h2>
                        <p>Name: {countryData.name}</p>
                        <div className='FlagImageDiv'>
                            <img src={countryData.flag} className='flagImage' alt='countryFlag' />
                        </div>
                        <p>Population: {countryData.population}</p>
                        <p>Vaccinated: {countryData.vaccinated}</p>
                        <p>FullyVaccinated: {countryData.fullyVaccinated}</p>
                        <p>VaccinatedPerHundred: {countryData.vaccinatedPerHundred}</p>
                        <p>DeltaVaccinated: {countryData.deltaVaccinated}</p>
                        <p>Doses: {countryData.doses}</p>
                        <p>Latitude: {countryData.lat}</p>
                        <p>Longitude: {countryData.lng}</p>
                    </div>
                )}
                <div className='ShowOverAllVaccineData'>
                    <p>population:{overAllData.population}</p>
                    <p>vaccinated:{overAllData.vaccinated}</p>
                    <p>fullyVaccinated:{overAllData.fullyVaccinated}</p>
                    <p>vaccinatedPerHundred:{overAllData.vaccinatedPerHundred}</p>
                    <p>deltaVaccinated:{overAllData.deltaVaccinated}</p>
                    <p>doses:{overAllData.doses}</p>
                </div>
            </div>
        </>
    );
}

export default CovidVisualsByCountry



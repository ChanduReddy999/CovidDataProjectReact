import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Globe from 'react-globe.gl';
import * as topojson from 'topojson-client';
import NavBar from '../NavBar';
import './CovidVaccineByCountry.css';
import countryNameJson from './countries.json'


const CovidVaccineByCountry = () => {
    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: [] });
    const [countryData, setCountryData] = useState(null);

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
        // console.log("countryName", countryName);
        const countryCode = countryNameJson[countryName];
        console.log("countryCode", countryCode);

        if (!countryCode) {
            console.error("Country code not found for:", countryName);
            return {};
        }

        const CovidVisualData = async (countryCode) => {
            try {
                const response = await axios.post('https://coviddataproject.onrender.com/prod/v1/covidvaccinedata', { countryCode });
                const result = response.data;
                const apiData = result.data || {};
                console.log("apiData", apiData);

                return apiData;
            } catch (error) {
                console.error("Error Fetching Data for Particular Day", error);
                throw error;
            }
        };

        return CovidVisualData(countryCode);
    };


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
                    polygonCapColor={() => '#2cabea'}
                    polygonSideColor={() => '#ea2cab'}
                    polygonStrokeColor={() => '#5804e9'}
                    onPolygonClick={handleCountryClick}
                />
                {countryData && (
                    <div className='ShowData'>
                        <h2>Country Data</h2>
                        <p>Name: {countryData.name}</p>
                        <div className='FlagImageDiv'>
                        <img src={countryData.flag} className='flagImage' alt='countryFlag' />
                        </div>
                        <p>Cases: {countryData.cases}</p>
                        <p>CasesPerOneMillion: {countryData.casesPerOneMillion}</p>
                        <p>deaths: {countryData.deaths}</p>
                        <p>deathsPerOneMillion: {countryData.deathsPerOneMillion}</p>
                        <p>deltaCases: {countryData.deltaCases}</p>
                        <p>deltaDeaths: {countryData.deltaDeaths}</p>
                        <p>deltaRecovered: {countryData.deltaRecovered}</p>
                        <p>deltaVaccinated: {countryData.deltaVaccinated}</p>
                        <p>population: {countryData.population}</p>
                        <p>recovered: {countryData.recovered}</p>
                        <p>reports: {countryData.reports}</p>
                        <p>testsPerOneMillion: {countryData.testsPerOneMillion}</p>
                        <p>totalTests: {countryData.totalTests}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default CovidVaccineByCountry



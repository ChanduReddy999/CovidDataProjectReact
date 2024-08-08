import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import './covid.css'

const Covid = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getCovidData();
    }, [])

    const getCovidData = async () => {
        try {
            // const apiUrl = 'https://api.covid19india.org/data.json';
            // const data = await fetch(apiUrl, {
            //     mode: 'no-cors'
            // })

            // const data = await fetch('https://api.covid19india.org/data.json');
            // const finalData = await data.json();
            // console.log("finalData", finalData.statewise[0]);
            // setData(finalData.statewise[0])

            await axios.get('https://coviddataproject.onrender.com/prod/v1/covidData').then(response => {
                const covidData = response.data
                // console.log("covidData", covidData);
                // console.log("covidData",covidData.data.confirmed);
                setData(covidData.data)
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavBar />
            <div className='main' id='Home'>
                <div className='first'>
                <div className='first_Internal'>
                <div className='liveCircle'></div>
                <div><h1 className='headingOne'>LIVE</h1></div>    
                </div>
                    <h2 className='headingTwo'>Covid-19 Live Tracker</h2>
                    <p className="desclaimer">!Desclaimer: This content / information is last updated on {data.lastupdatedtime}</p>
                </div>
                <div className='second'>
                    <ul className='ulTag'>
                        <div className='ulDivOne'>
                            <div>
                                <li>
                                    <p className='paraOne'>Our <span className='spanOne'>Country</span></p>
                                    <p className='paraTwo'>INDIA</p>
                                </li>
                            </div>
                            <div>
                                <li>
                                    <p className='paraOne'>Total <span className='spanOne'>Recovered</span></p>
                                    <p className='paraTwo'>{data.recovered}</p>
                                </li>
                            </div>
                            <div>
                                <li>
                                    <p className='paraOne'>Total <span className='spanOne'>Confirmed</span></p>
                                    <p className='paraTwo'>{data.confirmed}</p>
                                </li>
                            </div>
                        </div>
                        <div className='ulDivTwo'>
                            <div>
                                <li>
                                    <p className='paraOne'>Total <span className='spanOne'>Deaths</span></p>
                                    <p className='paraTwo'>{data.deaths}</p>
                                </li>
                            </div>
                            <div>
                                <li>
                                    <p className='paraOne'>Total <span className='spanOne'>Active</span></p>
                                    <p className='paraTwo'>{data.active}</p>
                                </li>
                            </div>
                            <div>
                                <li>
                                    <p className='paraOne'>Last <span className='spanOne'>Updated</span></p>
                                    <p className='paraTwo'>{data.lastupdatedtime}</p>
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Covid

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavBar from '../IndiaCovidData/NavBar';
import './statewise.css'

const StateWise = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getCovidData();
    }, []);

    const getCovidData = async () => {
        try {
            await axios.get('https://coviddataproject.onrender.com/prod/v1/stateWiseCovidData').then(response => {
                const covidData = response.data
                // console.log("covidDatas", covidData.data);
                setData(covidData.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <NavBar />
            <div className='stateWiseMain' id='StateWiseData'>
                <div>
                    <h1 className='headingStateWise'>India Covid-19 StateWise Data</h1>
                </div>
                <div className='second'>
                    <table className='tableStructure'>
                        <thead className='tableHead'>
                            <tr className='tableHeadingRow'>
                                <th className='headingNames'>State</th>
                                <th className='headingNames'>Confirmed</th>
                                <th className='headingNames'>Recovered</th>
                                <th className='headingNames'>Active</th>
                                <th className='headingNames'>Deaths</th>
                                <th className='headingNames'>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody className='tableBody'>
                            {
                                data.map((elem, index) => {
                                    return (
                                        <tr key={index} className='tableDataRow'>
                                            <td className='tableData'>{elem.state}</td>
                                            <td className='tableData'>{elem.confirmed}</td>
                                            <td className='tableData'>{elem.recovered}</td>
                                            <td className='tableData'>{elem.active}</td>
                                            <td className='tableData'>{elem.deaths}</td>
                                            <td className='tableData'>{elem.lastupdatedtime}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default StateWise;

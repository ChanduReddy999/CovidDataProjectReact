import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import './CovidDoses.css'


const CovidDoses = () => {
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');

    useEffect(() => {
        const dayWiseData = async () => {
            try {
                const parts = date.split('-');
                const desiredDate = parts[2] + '/' + parts[1] + '/' + parts[0];
                console.log("desiredDate", desiredDate);
                const response = await axios.post('https://coviddataproject.onrender.com/prod/v1/dayWiseCovidTests', { desiredDate });
                const result = response.data;
                console.log(result.data[0]);
                if (result && result.data[0]) {
                    setData(result.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error Fetching Data for Particular Day", error);
            }
        };
    
        if (date) {
            dayWiseData();
        }
    }, [date]);
    

    const InputEvent = (event) => {
        setDate(event.target.value);
    };

    const submitDate = (event) => {
        event.preventDefault();
        console.log('Fetching data for date:', date);
    };

    return (
        <>
            <NavBar />
            <div className='dosesMain' id='DayWiseData'>
                <div className='dosesOne'>
                    <h1 className='dosesHeading'>Covid Doses</h1>
                    <form onSubmit={submitDate}>
                        <input type='date' onChange={InputEvent} value={date} />
                    </form>
                </div>
                {date && data.length > 0 && (<div className='dosesTwo'>
                    <ul className='dosesTwoUl'>
                        <div className='dosesDataMain'>
                            <div className='dosesDataFirst'>
                                <div>
                                    <li>
                                        <p>over45years1stdose</p>
                                        <p>{data[0].over45years1stdose}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>over45years2nddose</p>
                                        <p>{data[0].over45years2nddose}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>over60years1stdose</p>
                                        <p>{data[0].over60years1stdose}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>over60years2nddose</p>
                                        <p>{data[0].over60years2nddose}</p>
                                    </li>
                                </div>

                            </div>
                            <div className='dosesDataFirst'>
                                <div>
                                    <li>
                                        <p>positivecasesfromsamplesreported</p>
                                        <p>{data[0].positivecasesfromsamplesreported}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>registration18-45years</p>
                                        <p>{data[0]['registration18-45years']}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>registrationabove45years</p>
                                        <p>{data[0].registrationabove45years}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>samplereportedtoday</p>
                                        <p>{data[0].samplereportedtoday}</p>
                                    </li>
                                </div>

                            </div>
                            <div className='dosesDataFirst'>
                                <div>
                                    <li>
                                        <p>testedasof</p>
                                        <p>{data[0].testedasof}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>totaldosesprovidedtostatesuts</p>
                                        <p>{data[0].totaldosesprovidedtostatesuts}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>totalindividualsregistered</p>
                                        <p>{data[0].totalindividualsregistered}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>totalindividualstested</p>
                                        <p>{data[0].totalindividualstested}</p>
                                    </li>
                                </div>

                            </div>
                            <div className='dosesDataFirst'>
                                <div>
                                    <li>
                                        <p>totalpositivecases</p>
                                        <p>{data[0].totalpositivecases}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>totalrtpcrsamplescollectedicmrapplication</p>
                                        <p>{data[0].totalrtpcrsamplescollectedicmrapplication}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>totalsamplestested</p>
                                        <p>{data[0].totalsamplestested}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>totalvaccineconsumptionincludingwastage</p>
                                        <p>{data[0].totalvaccineconsumptionincludingwastage}</p>
                                    </li>
                                </div>
                            </div>

                            <div className='dosesDataFirst'>
                                <div>
                                    <li>
                                        <p>updatetimestamp</p>
                                        <p>{data[0].updatetimestamp}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>years1stdose</p>
                                        <p>{data[0].years1stdose}</p>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <p>years2nddose</p>
                                        <p>{data[0].years2nddose}</p>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                )}
                {date && data.length === 0 && (
                    <div className='dosesTwo'>
                        <p>No data available for the selected date.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default CovidDoses

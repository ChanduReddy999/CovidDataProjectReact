import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Covid from './components/IndiaCovidData/covid';
import StateWise from './components/IndiaCovidData/statewise';
import NotFoundPage from './components/notFoundPage';
import CovidDoses from './components/IndiaCovidData/CovidDoses';
import CovidVisualsByCountry from './components/CovidVisuals/CovidVisualsByCountry';
import CovidVaccineByCountry from './components/CovidVisuals/CovidVaccineByCountry';


const router = createBrowserRouter([
  {
    path:'/',
    element:<Covid />,
    errorElement:<NotFoundPage />
  },
  {
    path:'statewise',
    element:<StateWise />
  },
  {
    path:'daywisecoviddoses',
    element:<CovidDoses />
  },
  {
    path:'covid',
    element:<CovidVisualsByCountry />
  },
  {
    path:'covidvaccine',
    element:<CovidVaccineByCountry />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

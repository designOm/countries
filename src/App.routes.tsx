import react from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { AppLayout } from './screens'
import CountriesList from './screens/countriesList'


const AppRoutes = () => {
  return <Router>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<CountriesList />}/>
      </Route>
    </Routes>
  </Router>
}

export default AppRoutes
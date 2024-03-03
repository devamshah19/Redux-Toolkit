import { Container } from '@chakra-ui/react'
import './App.css'
import { DisplayEmployees } from './DisplayEmployees'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmployeeLogin } from './EmployeeLogin';
import EmployeeInfo from './EmployeeInfo';
import Header from './Header';
import { EmployeeLogout } from './EmployeeLogout';
import { InsertEmployee } from './InsertEmployee';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          <Container padding={10}>
            <EmployeeLogin />
          </Container>
        } />
        <Route exact path="/displayemployees" element={<DisplayEmployees />} />
        <Route exact path="/employeeinfo" element={<EmployeeInfo />} />
        <Route exact path="/employeelogout" element={<EmployeeLogout />} />
        <Route exact path="/insertemployee" element={<InsertEmployee />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { Route, Routes } from 'react-router-dom';
import Signin from './page/Signin'; // Ensure you are importing the default export
import Signup from './page/Signup'; // Ensure you are importing the default export
import Dashboard from './page/Dashboard'; // Ensure you are importing the default export
import SendMoney from './page/SendMoney'; // Ensure you are importing the default export

function App() {
    return (
        <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
        </Routes>
    );
}

export default App;

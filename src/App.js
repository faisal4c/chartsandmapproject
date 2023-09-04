import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact.tsx";
import { ContactProvider } from "./Context Provider/ContactContext";
import EditContact from "./pages/EditContact.tsx";
import ChartsandMap from "./pages/ChartsandMap.tsx";
function App() {
  return (
    <div className="mainApp">
      <ContactProvider>
        <BrowserRouter>
          <div className="sidebar">
            <Link to="/contact">Contact</Link>
            <Link to="/chartsandmap">Charts and Map</Link>
          </div>
          <Routes>
            <Route path="/" exact element={<ChartsandMap />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/editcontact/:id" exact element={<EditContact />} />
            <Route path="/chartsandmap" exact element={<ChartsandMap />} />
          </Routes>
        </BrowserRouter>
      </ContactProvider>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TicketList } from './components/TicketList';
import { TicketForm } from './components/TicketForm';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/create" element={<TicketForm />} />
          <Route path="/edit/:id" element={<TicketForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

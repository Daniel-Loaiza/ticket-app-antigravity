import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TicketList } from './components/TicketList';
import { TicketForm } from './components/TicketForm';
import { MainPage } from './pages/MainPage';
import { AdminPage } from './pages/AdminPage';
import { CreatorPage } from './pages/CreatorPage';
import { SolverPage } from './pages/SolverPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Routes>
          {/* Redirect root to main */}
          <Route path="/" element={<Navigate to="/main" replace />} />

          {/* New role-based pages */}
          <Route path="/main" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/creator" element={<CreatorPage />} />
          <Route path="/solver" element={<SolverPage />} />

          {/* Legacy routes for backward compatibility */}
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/create" element={<TicketForm />} />
          <Route path="/edit/:id" element={<TicketForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

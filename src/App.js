import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      
      setTickets(data.tickets);
      setUsers(data.users);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="app-title">Kanban Board</h1>
      <KanbanBoard tickets={tickets} users={users} />
    </div>
  );
}

export default App;

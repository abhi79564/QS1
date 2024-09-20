import React from 'react';
import './Card.css';

const priorityIcons = {
  4: '🔴', 
  3: '🟠', 
  2: '🟡',
  1: '🟢',
  0: '⚪' 
};

const priorityColors = {
  4: '#ff4d4d',  
  3: '#ff9933', 
  2: '#ffcc00',  
  1: '#33cc33',  
  0: '#d9d9d9'   
};

function Card({ ticket, user }) {
  return (
    <div className="kanban-card" style={{ borderLeft: `5px solid ${priorityColors[ticket.priority]}` }}>
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
      </div>
      <h3 className="card-title">{ticket.title}</h3>
      <div className="card-footer">
        <span className="priority-icon">{priorityIcons[ticket.priority]}</span>
        <span className="feature-tag">Feature Request</span>
        <span className="card-user">{user?.name || 'Unassigned'}</span>
      </div>
    </div>
  );
}

export default Card;

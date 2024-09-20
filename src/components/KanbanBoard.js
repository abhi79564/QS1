import React, { useState, useEffect } from 'react';
import Card from './Card';
import './KanbanBoard.css';
import { FaPlus } from 'react-icons/fa';

const priorityNames = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    const groupKey = currentValue[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentValue);
    return result;
  }, {});
}

function KanbanBoard({ tickets, users }) {
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [groupedTickets, setGroupedTickets] = useState({});
  const [newTasks, setNewTasks] = useState({}); 

  useEffect(() => {
    let grouped;
    if (grouping === 'user') {
      grouped = groupBy(tickets, 'userId');
    } else if (grouping === 'priority') {
      grouped = groupBy(tickets, 'priority');
    } else {
      grouped = groupBy(tickets, 'status');
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    setGroupedTickets(grouped);
  }, [tickets, grouping, ordering]);

  const handleAddTask = (groupKey) => {
    const newTask = newTasks[groupKey]?.trim();
    if (newTask) {
      const newTicket = {
        id: `TASK-${Date.now()}`,
        title: newTask,
        status: groupKey,
        priority: 0,
        userId: null
      };
      setGroupedTickets(prev => ({
        ...prev,
        [groupKey]: [...prev[groupKey], newTicket]
      }));
      setNewTasks(prev => ({ ...prev, [groupKey]: '' }));
    }
  };

  const handleTaskInputChange = (groupKey, value) => {
    setNewTasks(prev => ({ ...prev, [groupKey]: value }));
  };

  return (
    <div className="kanban-container">
      <div className="kanban-controls">
        <label>
          <span>Display</span>
          <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          <span>Ordering</span>
          <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([groupKey, tickets]) => (
          <div key={groupKey} className="kanban-column">
            <h2 className="column-title">
              {grouping === 'user' 
                ? (users.find(user => user.id === groupKey)?.name || "Unknown User")
                : grouping === 'priority' ? priorityNames[groupKey]
                : groupKey} {tickets.length}
            </h2>
            {tickets.map((ticket) => (
              <Card key={ticket.id} ticket={ticket} user={users.find(u => u.id === ticket.userId)} />
            ))}

            <div className="add-task">
              <input
                type="text"
                value={newTasks[groupKey] || ''}
                onChange={(e) => handleTaskInputChange(groupKey, e.target.value)}
                placeholder="Add new task..."
                className="task-input"
              />
              <button className="add-task-button" onClick={() => handleAddTask(groupKey)}>
                <FaPlus /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;

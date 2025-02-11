import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import './Users.css';

export default function Users() {
  const navigate = useNavigate();
  const { usersData } = useUserContext();
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (userId) => {
    setOpenAccordion(openAccordion === userId ? null : userId);
  };
  
  const handleViewTodos = (userId) => {
    // console.log(userId)
    navigate(`/todos/${userId}`);
  };

  return (
    <div className="users-container">
      <h1>Users Todo Lists</h1>
      <div className="accordion">
        {Object.values(usersData).map((user) => (
          <div className="accordion-item" key={user.id}>
            <div 
              className={`accordion-header ${openAccordion === user.id ? 'active' : ''}`}
              onClick={() => handleAccordionClick(user.id)}
            >
              <span className="user-name">{user.name}</span>
              <span className="arrow">▼</span>
            </div>
            <div className={`accordion-content ${openAccordion === user.id ? 'open' : ''}`}>
              <button 
                onClick={() => handleViewTodos(user.id)}
                className="view-all-btn"
              >
                View Full Todo List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
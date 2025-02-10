import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Users.css';

const Users = () => {
  // const navigate = useNavigate();
  
  const [usersData, setUsersData] = useState({
    1: {
      id: 1,
      name: "Aziz",
      tasks: [
        { id: 1, text: 'read the book (at least 5 pages)', completed: false },
        { id: 2, text: 'buy dog food', completed: true },
        { id: 3, text: 'call my parents', completed: false }
      ]
    },
    2: {
      id: 2,
      name: "Imaz",
      tasks: [
        { id: 1, text: 'clean my working place', completed: true },
        { id: 2, text: 'kill Bill', completed: true }
      ]
    }
  });

 
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (userId) => {
    setOpenAccordion(openAccordion === userId ? null : userId);
  };
  
  const handleViewTodos = (userId) => {
    console.log(userId);
    // navigate('/todos/${userId}', { 
      // state: {
      //   usersData: usersData[userId]
      // }
    // });
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
};

export default Users;
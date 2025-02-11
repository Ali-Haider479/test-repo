import React, { createContext, useState, useContext } from 'react';

// Create the context with an initial default value
const UserContext = createContext({
  usersData: {},
  updateUserTasks: () => {}
});

export function UserProvider({ children }) {
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
  function handleToggle(id) {
    const newTasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    setTasks(newTasks);
  }
  function handleDelete(userId, taskId) {
    updatedTasks = usersData[userId][tasks].filter(task => task.id !== id)


    setUsersData(prev =>  ({
      ...prev,
      [userId]:{
        ...prev[userId],
        tasks:updatedTasks
      }
    }));
  }
  function deleteCompletedTasks() {
      console.log(tasks)
      console.log("inside completed function ")
      const newTasks = tasks.filter(task => task.completed == false);
      setTasks(newTasks);
  }

  const updateUserTasks = (userId, newTasks) => {
    setUsersData(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        tasks: {...prev[userId][tasks],newTasks}
      }
    }));
  };

  return (
    <UserContext.Provider value={{ usersData, updateUserTasks }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
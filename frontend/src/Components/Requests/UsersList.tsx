import React, { useState } from "react";
import "../../Style/RequestsStyle/UsersListStyle.css";

interface User {
  id: number;
  name: string;
}

interface UsersListProps {
  handleUserItemClick: (userId: number, userName: string) => void;
}
// Hardcoded list of users TEMPORARLY
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Brown" },
  { id: 5, name: "Eva Lee" },
  { id: 6, name: "Michael Davis" },
  { id: 7, name: "Olivia Garcia" },
  { id: 8, name: "William Martinez" },
  { id: 9, name: "Sophia Rodriguez" },
  { id: 10, name: "Liam Wilson" },
];

const UsersList: React.FC<UsersListProps> = ({ handleUserItemClick }) => {
  const [selectedUserId, setSelectedUserId] = useState<number>(NaN);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = (user: User) => {
    setSelectedUserId(user.id);
    handleUserItemClick(user.id, user.name);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users-list-container">
      <div className="users-list-header">
        <h1>Public Users List</h1>
      </div>
      <div className="users-list-content">
        <div className="users-list-user-result">
          <input
            type="text"
            placeholder="Search for a Public User"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="users-scrollable-list">
          {/* Render the list of filtered users */}
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`user-item ${
                selectedUserId === user.id ? "selected" : ""
              }`}
              onClick={() => handleClick(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;

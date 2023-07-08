import React from "react";
import api from '../api'
import { useState } from 'react';

const Users = () => { 
  const [users, setUsers] = useState(api.users.fetchAll());

  const createHeader = () => {
   return users.length <= 12 && users.length !== 0 ?
    (
      <span className = {getBageClasses()}> {users.length} человек тусанет с тобой сегодня</span> 
    )
     : 
    (
      <span className = {getBageClasses()}> Никто не тусанет с тобой сегодня</span> 
    )
  };

  const getBageClasses = () => {
    let classes = 'badge  m-2 '
    classes += users.length === 0 ? "bg-danger"  : "bg-primary";
    return classes;
  };

  const handleDecrement = (userId) => {
    setUsers(prevState => prevState.filter(user => user !== userId))
  };

  function header() {
    return (
      users.length <= 12 && users.length !== 0 ? 
      <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Оценка</th>
      <th  scope="col"></th>
      </tr>
     :
      null 
    )
  }
return  ( <>
  <h2>{createHeader(users.length)}</h2>
  <table className="table table table-sm">
  <thead>{header()}</thead>

  <tbody>
    {users.map(user=>{ 
    return ( 
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{ user.qualities.map(quality => {
        return <p key={quality._id} className={`m-1 badge bg-${quality.color}`}>{quality.name}</p>})
      }</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td><button onClick={()=>handleDecrement(user)} className ="btn btn-danger">Delete</button></td>
    </tr>
    )}
  )}
  </tbody>
</table>
</> 
)

}
export default Users;

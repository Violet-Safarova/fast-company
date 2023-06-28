import React from "react";
import api from '../api'
import { useState } from 'react';

const Users = () => { 
  const [users, setUsers] = useState(api.users.fetchAll());
  const [count, setCount] = useState(api.users.fetchAll().length);

  const createHeader = () => {
   return count <= 12 && count !== 0 ?
    (
      <>
      <span className = {getBageClasses()}> {count} человек тусанет с тобой сегодня</span> 
      </>
    )
     : 
    (
      <>
      <span className = {getBageClasses()}> Никто не тусанет с тобой сегодня</span> 
      </>
    )
  };

  const getBageClasses = () => {
    let classes = 'badge  m-2 '
    classes += count === 0 ? "bg-danger"  : "bg-primary";
    return classes;
  };

  const handleDecrement = (userId) => {
    setCount((prevState)=> prevState - 1)
    setUsers(prevState => prevState.filter(user => user !== userId))
  };

  const createTHead = () => {
   return count <= 12 && count !== 0 ? 
   (
    <>
    <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Оценка</th>
      <th scope="col"></th>
    </tr>
   </thead>
   </>
   ) 
   :
   (
    <>
    <thead hidden></thead>
    </>
   )
}

return  ( <>
  <h2>{createHeader(count)}</h2>
  <table className = "table table table-sm">
      {createTHead()}
<tbody>
  {
  users.map(user=> { 
  return ( <>
   <tr >
    <td key = {user.name}>{user.name}</td>
    <td>{
     user.qualities.map(quality => {
     const qualityColor = quality.color;
     let classes = 'm-1 badge bg-';
     classes+=qualityColor;
     return <tr key = {quality._id} className={classes}>{quality.name}</tr>})
    }</td>
    <td key = {user.profession._id}>{user.profession.name}</td>
    <td key ={user.completedMeetings} >{user.completedMeetings}</td>
    <td key = {user.rate}>{user.rate}/5</td>
    <td id = {user._id}><button onClick={() => handleDecrement(user)} className ="btn btn-danger">Delete</button></td>
   </tr>
   </> ) }
  )}
</tbody>
</table>
</> )
}
export default Users;

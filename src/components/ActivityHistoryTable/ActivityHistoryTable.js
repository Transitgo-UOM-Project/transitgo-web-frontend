import React, { useEffect, useState } from 'react'
import { Delete, DeleteOutline,Details,Edit } from '@mui/icons-material';

import './ActivityHistoryTable.css';
import  Button  from "@mui/material/Button";
import LoginButton from '../LoginButton/LoginButton';
import { ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import { Typography } from '@mui/material';
import { act } from '@testing-library/react';


export const ActivityHistoryTable = () => {
   const token = localStorage.getItem('token');
   const id = localStorage.getItem('id');
   const [activityLog, setActivityLog] = useState([]);
   const [isEditing, setIsEditing] = useState(null);
   const [editDescription, setEditDescription] = useState('');
   const Authorization = {
      headers: {Authorization: `Bearer ${token}`}
    }

   useEffect(() => {
     loadActivityLogs();
   },[]);

  const loadActivityLogs = async() => {
     try{
         const response = await axios.get(`http://localhost:8080/api/user/${id}/activity-logs`,{
          headers: {Authorization: `Bearer ${token}`}
         });
         console.log(response.data.activityLogList);
         const activityArray = response.data.activityLogList || [];
         setActivityLog(activityArray);
         console.log(activityArray);
     }catch(error){
          console.log("Error fetching activity logs", error);
     }
  }

  const handleDelete = async(type, activityid) => {
   console.log(type);
   console.log(activityid);
   try{
    if (type === "Announcement"){
      const response = await axios.delete(`http://localhost:8080/announcement/${activityid}`,Authorization);
      console.log(response);
    }else if (type === "Lost Item"){
      const response = await axios.delete(`http://localhost:8080/lost/${activityid}`,Authorization);
      console.log(response);
    }else if(type === "Found Item") {
      const response = await axios.delete(`http://localhost:8080/found/${activityid}`,Authorization);
      console.log(response);
    }else if (type === "Package"){
      const response = await axios.delete(`http://localhost:8080/package/${activityid}`,Authorization);
      console.log(response);
    }
    loadActivityLogs();
    window.alert("Activity Deleted");
    
   }catch(error){
      console.log("Error deleting the Activity");
   }
  }

  const handleEditClick = (activity) => {
     setIsEditing(activity.activityId);
     setEditDescription(activity.description);
  }

  const handleSaveEdit = async (activity) => {
   
   const type = activity.activityType;
    try{
      if (type === "Lost Item"){
        const itemResponse = await axios.get(`http://localhost:8080/lost/${activity.activityId}`, Authorization);
        console.log(itemResponse);
        const updatedLostFound = {
          ...itemResponse.data,
          item_Description: editDescription,
          dateTime: itemResponse.data.dateTime || new Date().toISOString()
        };
        const response = await axios.put(`http://localhost:8080/lost/${activity.activityId}`,
           updatedLostFound,
           Authorization);
         console.log(response);
      }else if (type === "Found Item"){
        const itemResponse = await axios.get(`http://localhost:8080/found/${activity.activityId}`, Authorization);
        console.log(itemResponse);
        const updatedLostFound = {
          ...itemResponse.data,
          item_Description: editDescription,
          dateTime: itemResponse.data.dateTime || new Date().toISOString()
        };
        const response = await axios.put(`http://localhost:8080/found/${activity.activityId}`,
           updatedLostFound,
           Authorization);
         console.log(response);
      }else if (type === "Announcement"){
        const response = await axios.put(`http://localhost:8080/announcement/${activity.activityId}`,{
          details: editDescription
         }, Authorization);
         console.log(response);
      }else{
        console.log("No Response Found");
      }
      
      loadActivityLogs();
      setIsEditing(null);
      window.alert("Activity Updated");
    }catch(error){
      console.log("Error updating the Activity");
    }
  };
  const getStatusColor = (status) =>{
    switch (status){
        case 'Booked':
           return 'red';
        case 'Received':
          return 'blue'; 
        case 'Completed':
          return 'green'; 
        default:
          return '#000';
    }
  };

  return (
    
       <div className='activities'>
         {activityLog.length > 0 ? activityLog.map((activity) => (
               <div className='activity' key={activity.activityId}>
               <span className='desc'>
                  <p
                  style={{fontWeight: 'bold'}}
                  >{activity.activityType}
                  {activity.activityType === "Package" && (
                    <span> - {activity.activityId}</span>
                  )}
                  </p>
                  {isEditing === activity.activityId ? (
                     <input 
                        style={{width: '100%', padding: '2%', borderRadius: '5px', border: 'none'}}
                        type='text'
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                     />
                  ):(
                     <p>{activity.description} <br/> {activity.info} </p>
                     
                  )}
                  <p
                  style={{color: 'red', fontSize: '13px'}}
                  >Posted On : {new Date(activity.dateTime).toLocaleString()}</p>
               </span>
               {activity.activityType !== 'Package' ? (
            <span className='action'>
              <Button
                className='del'
                onClick={() => handleDelete(activity.activityType, activity.activityId)}>
                <Delete />
              </Button>
              {isEditing === activity.activityId ? (
                <Button
                  className='edit'
                  onClick={() => handleSaveEdit(activity)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  className='edit'
                  onClick={() => handleEditClick(activity)}
                >
                  <Edit />
                </Button>
              )}
            </span>
          ):(
            <Typography
              sx={{backgroundColor: getStatusColor(activity.pacStatus),
                color: "white",
                padding: "4px 5px",  
                borderRadius: "5px", 
                fontSize: "1rem", 
                display: "inline-flex", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer", 
                margin: "4px", 
                textAlign: "center", 
                minWidth: "50px",
                height: "30px", 
                lineHeight: "normal" }}
              > 
              {activity.pacStatus}
              </Typography>
          )}
        </div>
      )) : (
        <p style={{ textAlign: 'center', fontSize: '2rem', opacity: '0.5' }}>No Activity Found</p>
      )}
       </div>
  );
}

export default ActivityHistoryTable;

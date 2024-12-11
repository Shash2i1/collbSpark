import React, { useEffect, useState } from 'react'
import {MyProjectsComp} from '../ContentPages/index'
import projectService from '../../appwrite/ProjectServices';
import { useSelector } from 'react-redux';

function MyProjects() {

  const [projects, setProjects] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  useEffect(() => {
    projectService.getMyProjects(userData?.userData.$id).then( (project) =>{
        if(project){
          setProjects(project.documents);
        }
    })
  }, [userData]);
  
  return (
    <div>
      <MyProjectsComp projects={projects} setProjects={setProjects}/>;
    </div>
  )
}

export default MyProjects
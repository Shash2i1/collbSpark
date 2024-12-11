import React, { useState } from 'react'
import { Notification } from './index'
import projectService from '../appwrite/ProjectServices'
import {Icon} from '@iconify/react'
import { useSelector } from 'react-redux'

function SaveComp({projectID}) {

    const [notification, setNotification] = useState(null);
    const userData = useSelector( state => state.auth.userData);

    const save = () =>{
        
    }

    return (
        <>
            <button className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300"
            onClick={save}
            >
                <Icon icon="material-symbols:bookmark-outline" width="24" height="24" />
            </button>
            {notification&& <Notification message={notification}/>}
        </>
    )
}

export default SaveComp
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfileAction } from '../../redux/actions/authAction'
import getFirstLetter from '../../utils/getFirstLetter'

function Profile() { 

    const dispatch = useDispatch() 

    const {profile} = useSelector(state=>state.authState)


    useEffect(()=>{
        dispatch(fetchProfileAction())

    }, [])


  return (
    <div>
        <div className="container">
            <h3 className="text-3xl font-medium">Profile</h3> 


            <div>
                {profile && (
                    <div className="card">
                        <div className="circle !w-8 !h-8 !text-xs">
                            {getFirstLetter(profile.username)}
                        </div>
 
                        <h3>{profile.username}</h3>
                        <h3>{profile.email}</h3>
                        <h3>{profile.createdAt}</h3>
                    </div>
                
                )}
            </div>


        </div>
    </div>
  )
}

export default Profile
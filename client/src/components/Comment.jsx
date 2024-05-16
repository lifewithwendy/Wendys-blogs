import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

export default function Comment({comment, onLike, onEdit, onDelete}) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const { currentUser } = useSelector(state => state.user);
    const  [editedContent, setEditedContent] = useState(comment.content);
    // console.log(user)
    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    }

    const handleSave = async () => {
        try {
            const res  = await fetch(`/api/comment/editComment/${comment._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                content: editedContent 
            }),
        });
        if(res.ok){
            setIsEditing(false);
            onEdit(comment._id, editedContent);
        }
        setIsEditing(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    }, [comment])
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
    <div className="flex shrink-0 mr-3">
        <img 
            src={user.profilePicture}  
            alt={user.username} 
            className='h-10 w-10 rounded-full bg-gray-200 object-cover'
        />
    </div>
    <div className="flex-1">
        <div className="flex items-center mb-1">
            <span className='font-bold mr-1 text-xs truncate'>
                {user ? `@${user.username}` : 'Anonymous user'}
            </span>
            <span className='text-gray-500 text-xs'>
                {moment(comment.createdAt).fromNow()}
            </span>
        </div>
        {isEditing ? (
            <>
                <Textarea 
                    className='mb-2'
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}     
                />
                <div className="flex justify-end gap-3 text-xs">
                    <Button
                        type='button'
                        size='sm'
                        gradientDuoTone='greenToBlue'
                        onClick={ handleSave }
                        >
                        Save
                    </Button>
                    <Button
                        type='button'
                        size='sm'
                        gradientDuoTone='greenToBlue'
                        outline
                        onClick={() => setIsEditing(false)}
                        >
                        Cancel
                    </Button>
                </div>
            </>
            ) : (
            <>
                <p className='text-gray-500 mb-2'>
            {comment.content}
                </p>
                <div className="flex item-center gap-2 text-xs border-t dark:border-gray-700 max-w-fit">
                    <button 
                        type='button' 
                        className={`text-gray-400 hover:text-blue-500 ${
                            currentUser &&
                            comment.likes &&
                            comment.likes.includes(currentUser._id) &&
                            '!text-blue-500'
                        }`}
                        onClick={() => onLike(comment._id)}
                        >
                    <FaThumbsUp className='text-sm-1'  />
                    </button>
                    <p className='text-gray-400'>
                    {
                        comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
                    }
                    </p>
                    {
                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <>
                            <button
                                type='button'
                                onClick={ handleEdit }
                                className='text-gray-400 hover:text-blue-500'
                            >
                                Edit
                            </button>
                            <button
                                type='button'
                                onClick={ () => onDelete(comment._id) }
                                className='text-gray-400 hover:text-red-500'
                            >
                                Delete
                            </button>
                            </>
                        )
                    }
                </div>
            </>
        )}
        
    </div>
    </div>
  )
}

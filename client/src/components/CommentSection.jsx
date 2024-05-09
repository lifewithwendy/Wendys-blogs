import { Alert, Button,Textarea } from 'flowbite-react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function CommentSection({postId}) {
    const { currentUser } = useSelector(state => state.user);
    const [comments, setComments] = useState('');
    const [commentError, setCommentError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitting comment');
        e.preventDefault();
        if( comments.length > 200 ){
            return;
        }
        try{
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comments,
                    postId,
                    userId: currentUser._id
                }),
            });
            const data = await res.json();
            if (res.ok){
                setComments('');
                setCommentError(null);
            }
        }catch(error){
            console.log(error.message);
            setCommentError(error.message);
        }

    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {
        currentUser ? (
            <div className="flex item-center gap-1 text-gray-500 text-sm">
                <p className=''>
                    signed in as :
                </p>
                <img
                    className='w-5 h-5 rounded-full object-cover mr-2' 
                    src={ currentUser.profilePicture }
                    alt="profilepicture" />
                <Link to ='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
                    {currentUser.username}
                </Link>
            </div>
        ) : (
            <div className="text-sm text-teal-500 my-5 flex gap-1">
                You must be signed in to comment:
                <Link to='/sign-in' className='text-red-500 hover:underline'>  Sign in </Link>
            </div>
        )
      }
      {
        currentUser && (
            <form onSubmit={ handleSubmit } className='flex flex-col gap-2 mt-3 rounded-md p-3 border border-teal-500'>
                <Textarea
                    placeholder='Add a comment' 
                    rows='3'
                    maxLength='200'
                    onChange={(e) => setComments(e.target.value)}
                    value={comments}	
                />
                <div className="flex justify-between items-center">
                    <p className='text-gray-500'>{200-comments.length} characters remaining</p>
                    <Button 
                        outline 
                        gradientDuoTone='greenToBlue'
                        type='submit'>
                        Submit
                    </Button>
                </div>
                {commentError &&
                    <Alert color='failure' className='mt-5'>
                        {commentError || 'An error occured while submitting your comment'}
                    </Alert>
                }
            </form>
        )
      }
    </div>
  )
}

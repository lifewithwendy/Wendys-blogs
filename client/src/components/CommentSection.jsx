import { Alert, Button,Textarea } from 'flowbite-react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';
import { set } from 'mongoose';


export default function CommentSection({postId}) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(false);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitting comment');
        if( comment.length > 200 ){
            return;
        }
        try{
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id
                }),
            });
            const data = await res.json();
            if (res.ok){
                setComment('');
                setCommentError(null);
                setComments([data, ...comments])
            }
        }catch(error){
            console.log(error.message);
            setCommentError(error.message);
        }

    }

    const handleLike = async (commentId) => {
        try {
            if(!currentUser){
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if(res.ok){
                setComments(comments.map((comment) => {
                    if(comment._id === commentId){
                        return {...comment, likes: comment.likes + 1}
                    }
                    return comment;
                }))
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) => 
                c._id === comment._id ? {...c, content: editedContent} : c 
            )
        );
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if(res.ok){
                    const data= await res.json();
                    setComments(data);
                    // console.log(comments)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments();
    },[postId])

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
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}	
                />
                <div className="flex justify-between items-center">
                    <p className='text-gray-500'>{200-comment.length} characters remaining</p>
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
        )}
            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className="flex flex-row text-sm my-5 items-center gap-1">
                        comments
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {
                        comments.map((comment) =>(
                            <Comment 
                                key={comment._id} 
                                comment={comment} 
                                onLike={ handleLike }
                                onEdit={ handleEdit }
                            />
                        ))
                    }
                </>
            )}
    </div>
  )
}

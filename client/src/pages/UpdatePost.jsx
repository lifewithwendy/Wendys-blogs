import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState, } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate, useParams } from  'react-router-dom'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: 'uncategorized',
    content: "",
    image: "",
  });
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();	
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  
  
  useEffect(() => {
    try {
        const fetchPost = async () => {
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();
            console.log(data.posts[0]);
            if(!res.ok) {
                console.log(data.message);
                setPublishError(data.message);
                return;
            } 
            if(res.ok) {
                setPublishError(null);
                setFormData({
                  title: data.posts[0].title,
                  category: data.posts[0].category,
                  content: data.posts[0].content,
                  image: data.posts[0].image,
                });
                console.log(formData);
            }
        }
        fetchPost();


    } catch (error) {
        console.log(error);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok) {
        setPublishError(data.message);
        return
      }
      if(res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
      
    } catch (error) {
      setPublishError('Post creation failed...');
      console.log(error.message);
    }
  };

  const handleUploadImage = async () => {
    try {
      if(!file) {
        imageUploadError('Please select an image to upload');
        return
      };
      setImageUploadError(null);
      const storage = getStorage(app);
      const filename = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed', 
        (snapshot) => {
          const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setImageUploadProgress(progress.toFixed(0));
        }, 
        (error) => {
          // console.log(error);
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImageUploadError(null);
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL })
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error); 
    }
  };

  return (
    <motion.div 
      className='p-3 max-w-3xl mx-auto min-h-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
      <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
        <div className="flex flex-cols gap-4 sm:flex-row justify-between">
          <TextInput 
            type='text' 
            placeholder='Title'
            required id='title'
            className='flex-1' 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          <Select 
            onChange={(e) => 
              setFormData({ ...formData, category: e.target.value }) 
            }
            value={formData.category }
          >
            <option value='uncategorized'>Select an option</option>
            <option value='javascript'>Java Script</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 item-center justify-between 
        border-4 border-teal-500 border-dotted p-3">
          <FileInput 
            type='file' 
            accept='image/*' 
            onChange={(e) => setFile(e.target.files[0])}
            />
          <Button 
            type='button' 
            gradientDuoTone='greenToBlue' 
            className='' 
            size='sm' 
            outline
            onClick={ handleUploadImage }
            disabled={ imageUploadProgress }
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
                ) : (
                  'Upload Image'
                )
               }
            </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )
        }
        <ReactQuill 
          value={formData.content }
          theme="snow" 
          placeholder='Write Something....'
          className='h-72 mb-12 '
          required
          onChange={(value) => setFormData({ ...formData, content: value})}
          />
        <Button 
          className='' 
          type='submit' 
          gradientDuoTone='greenToBlue'
          >Publish</Button>
        {
          publishError && 
            <Alert color='failure'>
              {publishError}
            </Alert>
        }
      </form>
    </motion.div>
  )
}

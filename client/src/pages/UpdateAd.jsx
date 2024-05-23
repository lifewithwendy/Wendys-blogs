import { 
  Alert, 
  Button, 
  FileInput, 
  TextInput,
  Select 
} from 'flowbite-react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate } from  'react-router-dom'
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export default function UpdateAd() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setformData] = useState({});
  const [status, setStatus] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const { adId } = useParams();
  const navigate = useNavigate();
  console.log(formData)
 
  useEffect(() => {
    try {
        const fetchAd = async () => {
            const res = await fetch(`/api/ad/getAdToUpdate/${adId}`);
            const data = await res.json();
            if(!res.ok) {
                console.log(data.message);
                setPublishError(data.message);
                return;
            } 
            if(res.ok) {
                setPublishError(null);
                setformData(data);
            }
        }
        fetchAd();


    } catch (error) {
        console.log(error);
    }
  }, [adId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/ad/updateAd/${adId}`, {
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
        setStatus(true)
        console.log("Uploaded")
        navigate('/dashboard?tab=ads')
      }
      
    } catch (error) {
      setPublishError('Ad creation failed...');
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
            setformData({ ...formData, image: downloadURL })
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
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Advertisement</h1>
      <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
        <div className="flex flex-cols gap-4 sm:flex-row justify-between">
          <TextInput 
            type='text' 
            placeholder='Title'
            id='title'
            value={formData.title || ''}
            className='flex-1' 
            onChange={(e) => setformData({ ...formData, title: e.target.value })}
            />
          <Select
            value={formData.priority} 
            onChange={(e) => 
              setformData({ ...formData, priority: e.target.value }) 
            }
          >
            <option value=''>Select Priority</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </Select>
        </div>
        <div className="flex flex-cols gap-4 sm:flex-row justify-between">
          <TextInput 
            type='link' 
            placeholder='Redirect Link'
            id='link'
            value={formData.link}
            className='flex-1' 
            onChange={(e) => setformData({ ...formData, link: e.target.value })}
            />
          <Select 
          value={formData.type}
            onChange={(e) => 
              setformData({ ...formData, type: e.target.value }) 
            }
          >
            <option value='portrait'>Select Image Type</option>
            <option value='lanscape'>lanscape</option>
            <option value='portrait'>portrait</option>
            <option value='square'>square</option>
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
        {
          status && (
            <>
            <Alert color='success'>
              Uploaded!
              </Alert>
            </>
          )
        }
      </form>
    </motion.div>
  )
}

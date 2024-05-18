import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useState,useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  getDownloadURL, 
  getStorage ,
  ref, 
  uploadBytesResumable 
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  updateStart, 
  updateSuccess, 
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi' 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion' 

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);
  const [showModel, setShowModel ] = useState(false);
  const dispatch = useDispatch();
  // console.log(imageFileUploadProgress, imageFileUploadError);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }
  
  const uploadImage = async () => {
    console.log('Uploading Image...');
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read; 
    //       allow write: if 
    //       request.resource.size < 2 * 1024 * 1024  &&
    //       request.resource.contentType.matches('image/*');
    //     }
    //   }
    // }
    setImageFileUploadError(null);
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed', 
      (snapshot) => { //piece of imformation you get byte by byte 
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        setImageFileUploadProgress(progress.toFixed(0));
      }, 
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData,profilePicture: downloadURL})
          setImageFileUploading(null);
        });
      }
    );
  }

  const handleChange = (e) => {
    setFormData( {...formData, [e.target.id]: e.target.value} );
  }

  // console.log(formData);
  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(Object.keys(formData).length === 0 || (!imageFileUrl)){
      setUpdateUserError('No changes made...');
      setUpdateUserSuccess(null)
      return;
    }
    if(imageFileUploading || imageFileUploadProgress< 100){
      setUpdateUserError('Image is uploading...');
      setUpdateUserSuccess(null)
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);

      }else {
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile updated successfully");
        setUpdateUserError(null);
      }
    }catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    setShowModel(false); // Assuming setShowModel is correctly defined
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
        });
        const data = await res.json();        
        if (!res.ok) {
            dispatch(deleteUserFailure(data.message)); // Dispatch error message
        } else {
            dispatch(deleteUserSuccess(data)); // Dispatch success data
        }
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignout = async () => { 
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok){
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

// console.log(imageFile,imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage();     
    }
  }, [imageFile]);

  return (
    <motion.div 
      className='max-w-lg mx-auto p-3 w-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <h1 className='my-4 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
        <input 
          type="file" 
          accept='image/*' 
          hidden 
          onChange={handleImageChange} 
          ref={filePickerRef}/>
        <div 
          className='relative w-32 h-32 self-center cursor-pointer 
            shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}  
          >
          {imageFileUploadProgress && !updateUserSuccess &&( //if updated remove percentage mark
             <CircularProgressbar
             value={imageFileUploadProgress || 0}
             text={`${imageFileUploadProgress}%`}
             strokeWidth={5}
             styles={{
               root: {
                 width: '100%',
                 height: '100%',
                 position: 'absolute',
                 top: 0,
                 left: 0,
               },
               path: {
                 stroke: `rgba(62, 152, 199, ${
                   imageFileUploadProgress / 100//variable is represented using ${}
                 })`,
               },
             }}
           />
         )}
          <img 
            src={imageFileUrl || currentUser.profilePicture} 
            alt="User"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress && 
                imageFileUploadProgress < 100 && 
                'opacity-60'
              }`}   
          />
        </div>
        {imageFileUploadError && 
          <Alert color='failure'>{imageFileUploadError}</Alert>
        }
          <TextInput 
            type='text' 
            id='username' 
            autoComplete='new-username'
            placeholder={currentUser.username}
            onChange={ handleChange }
          />
          <TextInput 
            type='email' 
            id='email' 
            autoComplete='new-email'
            placeholder={currentUser.email}
            onChange={ handleChange }
          />
          <TextInput 
            type='password' 
            id='password' 
            autoComplete='new-password'
            placeholder='***********'
            onChange={ handleChange }
          />
          <Button 
            type ='submit' 
            gradientDuoTone='purpleToBlue' 
            outline 
            disabled={loading || imageFileUploading}>
            {imageFileUploading ? 'Loading...' : 'Update'}
          </Button>
      </form> 
      <div className="text-red-500 flex justify-between">
          <span onClick={() => setShowModel(true) }className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
          {/* justify between keeps space between two components */}
      </div>
      {updateUserSuccess && !updateUserError &&
        <Alert color='success' className='mt-5'>
            {updateUserSuccess}
        </Alert>
      }
      {updateUserError && !updateUserSuccess &&
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      }
      {error && 
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      }
      {currentUser.isAdmin && (
        <>
        <h1 className='my-6 text-center font-semibold text-3xl'>Other options</h1>
        <Link to='/create-post'>
          <Button
            outline
            type='button'
            gradientDuoTone='purpleToPink'
            className='w-full mb-3'
            >
            Create a post
          </Button>
          </Link>
          <Link to='/create-ad'>
          <Button
            outline
            type='button'
            gradientDuoTone='purpleToPink'
            className='w-full'
          >
            Create a Advertisment
          </Button>
          </Link>
        </>
      )}
      <Modal 
        show={showModel} 
        onClose={() => setShowModel(false)}
        popup
        size='md'
      >
        <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle 
              className='h-16 w-16 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete your account ?
              </h3>
              <div className="flex justify-center gap-6">
                <Button color='failure' onClick={ handleDeleteUser }>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() =>setShowModel(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
      </Modal>
    </motion.div>
  );
}

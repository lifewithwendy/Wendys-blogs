import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function createPost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4'>
        <div className="flex flex-cols gap-4 sm:flex-row justify-between">
          <TextInput 
            type='text' 
            placeholder='Title'
            required id='title'
            className='flex-1' />
          <Select>
            <option value='uncategorized'>Select an option</option>
            <option value='javascript'>Java Script</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 item-center justify-between 
        border-4 border-teal-500 border-dotted p-3">
          <FileInput type='file' accept='image/*' />
          <Button type='button' gradientDuoTone='greenToBlue' 
          className='' size='sm' outline>Upload Image</Button>
        </div>
        <ReactQuill 
          theme="snow" 
          placeholder='Write Something....'
          className='h-72 mb-12'
          required
          />
        <Button className='' type='submit' gradientDuoTone='greenToBlue'>Publish</Button>
      </form>
    </div>
  )
}

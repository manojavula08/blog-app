
import { Form } from 'react-router-dom'

function WriteBlog() {
    

    return (
        <div className='bg-gray-100 box-border  border-red-400 flex justify-center items-center h-screen'>
            <div className='bg-white shadow-md rounded px-8 pr-8 pt-6 mb-4 w-3/4 h-[80%]'>
            <div className='flex justify-between items-center my-10'>
            <h1>Write Blog</h1>
            </div>
                <Form method='post'>
                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>Title</label>
                        <input className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[50px]" id="title" type="text" name='title'/>
                    </div>
                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>Description</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-60 border-orange-300" id="description" type="text" name='description'/>
                    </div>
                    <div className=''>
                        <button type='submit' className="bg-orange-300 hover:bg-orange-500 text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-20">
                        Post
                        </button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default WriteBlog

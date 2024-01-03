import React from 'react'
import { useState } from 'react'
import Results from './results'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

function Configs() {
    let [DatasetName, setDatasetName] = useState('test')
    let [Folds, setFolds] = useState('')
    let [model, setModel] = useState('Sleep EDF (V1)')
    let [expanded, setExpanded] = useState(false)
    let [Subjects, setSubjects] = useState('')
    let [files, setFiles] = useState(null)
    let [loading, setLoading] = useState(false)
    let [result, setResult] = useState(null)
    let [gotData, setGotData] = useState(false)
    let onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        let backendURI = "http://localhost:5000/"
        let data = new FormData()
        data.append('dataset', DatasetName)
        data.append('n_folds', files.length)
        data.append('n_subjects', files.length)
        
        for (let i = 0; i < files.length; i++) {
            data.append('files' + i, files[i])
        }
        
        await fetch(backendURI, {
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            mode: "no-cors",
            method: "post",
            body: data
        })
        .then(async () => {
            let reslutURI = "http://localhost:5000/getResult"
            let response = await fetch(reslutURI, {
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                mode: "cors",
                method: "get",
            })
            let results = await response.json()
            console.log("Got", results)
            setResult(results)
            setLoading(false)
            setGotData(true)
        })
        .catch((error) => {
            console.error('Error:', error)
            setLoading(false)
        });
    }
    const resetForm = () => {
        setDatasetName('test');
        setFolds('');
        setModel('Sleep EDF (V1)');
        setExpanded(false);
        setSubjects('');
        setFiles(null);
        setLoading(false);
        setResult(null);
        setGotData(false);
    };

    return (
        <>
            <div className='grid grid-cols-1 container mx-auto gap-5'>
                           
                {files?.length > 0 ?
                    (<>
                        <div>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-1/2 h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <img className="h-10 w-10 mb-4" src='images/green tick.svg'></img>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">{files.length} File(s) Uploaded</span></p>
                                        {files.map((file, index) => {
                                            return (
                                                <p key={index} className="text-xs text-gray-500 dark:text-gray-400">{file.name}</p>
                                            )
                                        }
                                        )}
                                        <div className='ml-10 mt-10 grid grid-cols-10 gap-0'>                                            
                                            <button
                                                onClick={resetForm}
                                                type="button"
                                                className='text-center mt-1 col-span-8 text-gray-500'
                                            >
                                                <img className='mx-auto col-span-2' src='images/cross.png'></img>
                                            Remove files to start afresh
                                            </button>





                                        {/* <div className='ml-10 mt-10 grid grid-cols-10 gap-0'>
                                            <img onClick={
                                                () => {
                                                    setFiles([])                                                    
                                                }
                                            } className='mx-auto col-span-2' src='images/cross.png'></img>
                                            <div className='text-center mt-1 col-span-4 text-gray-500'>Remove all</div> */}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </>
                    ) :
                    (<>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-1/2 h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">sleep files of one or more subjects in npz format </p>
                                </div>
                                <input id="dropzone-file" onChange={
                                    (e) => {
                                        let allFiles = e.target.files;
                                        let temp = []
                                        for (let index = 0; index < allFiles.length; index++) {
                                            const element = allFiles[index];
                                            temp.push(element)
                                        }
                                        setFiles(temp)
                                    }
                                } type="file" multiple={true} className="hidden" />
                            </label>
                    </div>                        
                    </>)}
 
                    <button onClick={onSubmit} disabled={loading} type="submit" className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {loading ? <>
                                <div role="mx-4 status">
                                    <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </> : "Click to Visualize Sleep Patterns"}

                    </button>

                {
                    (!loading && gotData) ?
                        <Results results={result} files={files} /> :
                        null
                }

                
            </div>
          
        </>
    )
}

export default Configs
// import { useState, useEffect, useRef } from 'react';
// import Results from './results'
// function App1() {
//     const [isModelLoading, setIsModelLoading] = useState(false)
//     let [model, setModel] = useState('Sleep EDF (V1)')

//     const [imageURL, setImageURL] = useState(null);
//     const [results, setResults] = useState([])

//     const imageRef = useRef()
//     const fileInputRef = useRef()

//     const uploadImage = (e) => {
//         const { files } = e.target
//         if (files.length > 0) {
//             const url = URL.createObjectURL(files[0])
//             setImageURL(url)
//         } else {
//             setImageURL(null)
//         }
//     }

//     const identify = async () => {
//         const results = await model.classify(imageRef.current)
//         setResults(results)
//     }

//     const triggerUpload = () => {
//         fileInputRef.current.click()
//     }

//     return (
//         <div className="App">
//             <h1 className='header'>Sleep EDF Web app for understanding sleep patterns and sleep disorders.</h1>
//             <div className='inputHolder'>
//                 <input type='file' accept='image/*' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
//                 <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
//             </div>
//             <div className="mainWrapper">
//                 <div className="mainContent">
//                     <div className="imageHolder">
//                         {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
//                     </div>
//                     {results.length > 0 && <div className='resultsHolder'>
//                         {results.map((result, index) => {
//                             return (
//                                 <div className='result' key={result.className}>
//                                     <span className='name'>{result.className}</span>
//                                     <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
//                                 </div>
//                             )
//                         })}
//                     </div>}
//                 </div>
//                 {imageURL && <button className='button' onClick={identify}>Visualize Sleep Patterns</button>}
//             </div>
//         </div>
//     );
// }

// export default App1;


import React from 'react'
import { useState } from 'react'
import Results from './results'
import results from './results'
function Configs() {

    let [DatasetName, setDatasetName] = useState('')
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
        });



        let reslutURI = "http://localhost:5000/getResult"
        let response = await fetch(reslutURI, {
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            mode: "cors",
            method: "get",
        });
        let results = await response.json()
        console.log("Got", results)

        setResult(results)
        setLoading(false)
        setGotData(true)




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
            <div className='grid grid-cols-2 container mx-auto gap-5'>
                <div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dataset Name</label>
                        <input value={DatasetName} onChange={(e) => setDatasetName(e.target.value)}
                            type="text" id="data-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sleep EDF, Dreem Sleep etc" required />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Model</label>
                        <button value={model} onClick={() => setExpanded(!expanded)}
                            type="text" id="model" className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="20" required >
                            {model}
                        </button>
                        {expanded && <div className="absolute z-10 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800">
                            <div className="py-1">
                                <button onClick={() => setModel("Sleep EDF (V1)")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700" role="menuitem">Sleep EDF (V1)</button>
                            </div>
                        </div>
                        }
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Subjects</label>
                        <input value={Subjects} onChange={(e) => setSubjects(e.target.value)}
                            type="number" id="Folds" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                    </div>
                    <button onClick={onSubmit} disabled={loading} type="submit" className="w-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {loading ? <>
                            <div role="mx-4 status">
                                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </> : "Submit"}

                    </button>
                    <button
                onClick={resetForm}
                type="button"
                className="w-10 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2"
            >
                Reset
            </button>
                </div>
                {files?.length > 0 ?
                    (<>
                        <div>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                            {/* <img onClick={
                                                () => {
                                                    setFiles([])
                                                }
                                            } className='mx-auto col-span-2' src='images/cross.png'></img> */}
                                            <button
                onClick={resetForm}
                type="button"
                className='text-center mt-1 col-span-4 text-gray-500'
            >
                <img onClick={
                                                () => {
                                                    setFiles([])
                                                }
                                            } className='mx-auto col-span-2' src='images/cross.png'></img>
                Remove all
            </button>
                                            {/* <div className='text-center mt-1 col-span-4 text-gray-500'>Remove all</div> */}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </>
                    ) :
                    (<>
                        <div>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
                        </div>
                    </>)}
            </div>
            {
                (!loading && gotData) ?
                    <Results results={result} files={files} /> :
                    null
            }

        </>
    )
}

export default Configs
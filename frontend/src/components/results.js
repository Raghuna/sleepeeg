import React from 'react'
import { useState } from 'react'
// import plotly 
import Plot from 'react-plotly.js';

function Results({ results, files }) {
    const [active, setActive] = useState(0)

    const stylesText = {
        active: "inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group",
        inactive: "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    }
    const stylesIcon = {
        active: "w-5 h-5 mr-2 text-blue-600 dark:text-blue-500",
        inactive: "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
    }
    console.log("files", files)
    console.log("results", results.test[active])

    // let heatX = []
    // let temp = results.test[active]
    // while(temp.length){
    //     heatX.push(temp.splice(0, 10))

    // }
    let bigarray = results.test[active]
    var size = 40; var arrayOfArrays = [];
    for (var i = 0; i < bigarray.length; i += size) {
        arrayOfArrays.push(bigarray.slice(i, i + size));
    }
    console.log("arrayOfArrays", arrayOfArrays);


    // console.log("heatX", heatX)

    return (
        <>
            <div className='mt-5 container mx-auto bg-slate-50 rounded-lg'>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">

                        {
                            files.map((file, index) => {
                                return (
                                    <li className="mr-2">
                                        <a href="#" onClick={(e) => { e.preventDefault(); setActive(index) }} className={active === index ? stylesText.active : stylesText.inactive}>
                                            <svg aria-hidden="true" className={active === index ? stylesIcon.active : stylesIcon.inactive} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>{file.name}
                                        </a>
                                    </li>
                                )

                            })
                        }

                    </ul>
                </div>
                <Plot
                    data={[
                        {
                            x: results.test[active]?.map((_, i) => i),
                            y: results.test[active],

                            type: 'scatter',
                            mode: 'markers',
                            marker: { color: 'blue' },
                        },
                    ]}
                    layout={{



                        width: 1500, height: 400, title: 'Sleep Stage',
                        xaxis: {
                            title: {
                                text: 'Timestep',
                                font: {
                                    family: 'Courier New, monospace',
                                    size: 18,
                                    color: '#7f7f7f'
                                }
                            },
                        },
                        yaxis: {

                            title: {
                                text: 'Sleep Stage',
                                font: {
                                    family: 'Courier New, monospace',
                                    size: 18,
                                    color: '#7f7f7f'
                                }
                            },
                        },
                    }}
                />
                <div className='grid grid-cols-3 gap-5'>
                    <div>


                        <Plot
                            data={
                                [
                                    {
                                        z: arrayOfArrays,
                                        type: 'heatmap',
                                        colorscale: 'Greens',
                                    }
                                ]
                            }
                            layout={{

                                // annotations: arrayOfArrays.map((row, i) => {
                                //     return row.map((value, j) => {
                                //         return {
                                //             xref: 'x1',
                                //             yref: 'y1',
                                //             x: j,
                                //             y: i,
                                //             text: arrayOfArrays[i][j],
                                //             font: {
                                //                 family: 'Arial',
                                //                 size: 12,
                                //                 color: 'rgb(50, 171, 96)'
                                //             },
                                //             showarrow: false,
                                //         };
                                //     });
                                // }).flat(),
                                title: 'Sleep Stage Heat map',
                            }}

                        />
                    </div>
                    {/* add margin between grids */}
                     
                    <div className='ml-52'>
                        <div className='relative text-left bg-slate-200 text-xl p-10 rounded-xl text-gray-700' style={{
                            top: '50%',
                            transform: 'translateY(-50%)'

                        }}>
                            <div className='text-3xl mb-5 font-semibold'>
                                Legend
                            </div>
                            <div>⇒ 0: Wake</div>
                            <div>⇒ 1: N1</div>
                            <div>⇒ 2: N2</div>
                            <div>⇒ 3: N3</div>
                            <div>⇒ 4: REM</div> 



                        </div>
                    </div>

                    <div className=''>
                        <div className='relative text-left bg-slate-200 text-xl p-10 rounded-xl mr-5 text-gray-700' style={{
                            top: '50%',
                            transform: 'translateY(-50%)'

                        }}>
                            <div className='text-3xl mb-5 font-semibold'>
                                Note
                            </div>
                            
                            <div>⇒ N3 and N4 stages were combined as N3</div>
                            <div>⇒ The Code used for sleep stage prediction task is given here <a className='text-blue-600' href='https://github.com/SidJain-12/GTRU-Jr.'>GITHUB</a></div>
                            <div>⇒ You can download prediction as JSON object</div>


                        </div>
                    </div>
                </div>

                <div>
                    <a href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(results.test[active])
                    )}`}
                        download={files[active].name.substring(0, files[active].name.length-4) + ".JSON"}
                        type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Download JSON</a>
                </div>
            </div>





        </>
    )
}

export default Results
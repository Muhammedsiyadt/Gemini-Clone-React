import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets.js'
import siyad from '../../assets/siyad.jpg'
import { Context } from '../../context/Context.jsx'

const Main = () => {
    const { fetchData, recentPrompt, showResults, loading, resultData, setInput, input } = useContext(Context)

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={siyad} alt="" />
            </div>
            <div className="main-container">

            {!showResults 
            ? <>
            <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
            </> 
            :
            <div className='result'>
              <div className="result-title">
                <img src={siyad} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                ?
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
                : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
                
              </div>
            </div>

            }

                
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => fetchData(input)} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <div className="bottom-info">
                        <span>Gemini</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main

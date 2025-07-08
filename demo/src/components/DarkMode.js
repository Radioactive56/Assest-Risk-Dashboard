import React from 'react'
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

export default function DarkMode() {
    const setDarkMode = ()=>{
        document.querySelector("body").setAttribute('data-theme','dark')
    }
    const setLightMode = ()=>{
        document.querySelector("body").setAttribute('data-theme','light')
    }
    setDarkMode()
  return (
    <div>
      <div className="dark_mode"  style={{marginTop:"-35%"}}>
        <input type="checkbox" id='darkmode-toggle' className='dark_mode_input'/>
      <label className="dark_mode_label" htmlFor='darkmode-toggle'>
        <Sun/>
        <Moon/>
      </label>
      </div>

    </div>
  )
}

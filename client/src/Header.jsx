import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from './UserContext';
import { Calendar } from 'react-calendar'
import axios from "axios";


export default function Header({setPlaces, places}) {
  const {user} = useContext(UserContext)
  const [toggle, setToggle] = useState(false)
  const [openSearchbar, setOpenSearchbar] = useState(false)
  const [date, setDate] = useState(new Date())
  let menuRef = useRef()

  useEffect(() => {
    axios.get("/places").then(response => {
      setPlaces([...response.data]);
    });
  }, []);

  const filterResult = (catItem) => {
      const result = places.filter((curData) => {
        console.log(curData.address===catItem)
        return curData.address.includes(catItem)
      })
      setPlaces(result)
  }

  const filterAll = () => {
      axios.get("/places").then(response => {
        setPlaces([...response.data]); 
      });
  }

  useEffect(() => {
    let handler = (e) => {
      if(!menuRef.current.contains(e.target))
      setOpenSearchbar(false)
    }
    document.addEventListener('mousedown', handler)
  })

  return (
    <header className="z-50 flex justify-between sticky top-0 -mx-8 px-4 py-6 bg-white">
      <a href={'/'} className="flex items-center gap-1">
        <svg          
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 -rotate-90 text-[#196169]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl text-[#196169]">DirectBookings</span>
      </a>
      <div className="hidden md:flex -ml-24 gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <a href="/" className="cursor-pointer">Destination</a>
        <div className="border border-l border-gray-300"></div>
        <div className="flex items-center gap-2">
          <label>Travel Date:</label>
          <input type="date" className="cursor-pointer text-gray-500" />          
        </div>
        <div className="border border-l border-gray-300"></div>
        <Link to={'/'}  ref={menuRef} onClick={() => setOpenSearchbar(!openSearchbar)} className="flex gap-2">
          <div className="cursor-pointer text-gray-500">Regions</div>
          <div  className="cursor-pointer relative bg-primary text-white p-1 rounded-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          {openSearchbar && 
            <>
              <div className="z-40 flex gap-2 pb-12 justify-center  absolute -left-10 -right-10 top-20 pt-8 bg-white">
                <div onClick={(places.length < 10 || places.length > 10000)  && filterAll() && filterResult("France")} className="space-y-4">
                  <img src="https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320" className="h-32 w-32 bg-gray-300 rounded-2xl" />  
                  <p>I'm flexible</p>
                </div>
                  <div onClick={() => filterResult("France")} className="space-y-4">
                    <img src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg" className="h-32 w-32 bg-gray-300 rounded-2xl" />
                    <p>Europe</p>  
                  </div>
                <div onClick={() => filterResult("Japan")} className="space-y-4">
                  <img src="https://a0.muscache.com/im/pictures/26891a81-b9db-4a9c-8aab-63486b7e627c.jpg?im_w=320" className="h-32 w-32 bg-gray-300 rounded-2xl" />                    
                  <p>Japan</p>
                </div>
                <div onClick={() => filterResult("Australia")} className="space-y-4">
                  <img src="https://a0.muscache.com/im/pictures/42a1fb0f-214c-41ec-b9d7-135fbbdb8316.jpg?im_w=320" className="h-32 w-32 bg-gray-300 rounded-2xl" />  
                  <p>Australia</p>
                </div>
                <div onClick={() => filterResult("Thailand")} className="space-y-4">
                  <img src="https://a0.muscache.com/im/pictures/924d2b73-6c65-4d04-a2ad-bbc028299658.jpg?im_w=320" className="h-32 w-32 bg-gray-300 rounded-2xl" />  
                  <p>Thailand</p>
                </div>
                <div onClick={() => filterResult("United State")} className="space-y-4">
                  <img src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320" className="h-32 w-32 bg-gray-300 rounded-2xl" />  
                  <p>United State</p>
                </div>
              </div>    
            </>
          }
        </Link>
      </div>
      <Link
        to={user ? '/account': "/login"}
        className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        
        {user ? (
          <div>
            {user.name}
          </div>
        ) : (<><div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 relative top-1"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      </div></>)}
      </Link>
    </header>
  );
}

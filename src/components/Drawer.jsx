import { useState} from 'react';
import { NavLink } from 'react-router-dom';

// import { Link } from 'react-router-dom';
import emi_logo from '../assets/images/emi_logo.png';
import { 
  FaChevronLeft, 
  FaFolderOpen, 
  FaBuffer, 
  FaChevronDown, 
  FaTools,
  FaDatabase,
  FaChartBar,
  FaHome

} from "react-icons/fa";



const Drawer = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const Menus = [
    {title: "Product Policy",
      icon: <FaBuffer />, 
      submenu: true,
      subMenuItems: [
        {title: "3-In-1 Credit Life", link: '/3-in-1-credit' },
        {title: "2-In-1 Credit Life", link: '/2-in-1-credit'},
      ],
    },
    {title: "Import/Export",
      submenu: true,
      icon: <FaFolderOpen />, 
      subMenuItems: [
        {title: "Import", link: '/import'},
        {title: "Export", link: '/export'},
      ],
    },
    {title: "Tools",
      submenu: true,
      icon: <FaTools />, 
      subMenuItems: [
        {title: "Calculate Age", link: '/calculate-age'},
        {title: "Policy Wording", link: '/policy-wording'},
        {title: "Print Brochure", link: '/print-brochure'},
      ],
    },
    {title: "Find Data",
      icon: <FaDatabase />, 
      submenu: true,
      subMenuItems: [
        {title: "Search Data(Temp)", link: '/search-data-temp'},
        {title: "Search Data(Policy)", link: '/search-data-policy'},
        {title: "Claim Data", link: '/claim-data'},
      ],
    },
    {title: "Report",
      icon: <FaChartBar />, 
      submenu: true,
      subMenuItems: [
        {title: "Sale Report", link: '/report'},
      ],
    },
    // {title: "Profile", spacing: true},
    // {title: "Setting", spacing: true},
    // {title: "Logout", spacing: true}
  ]

  return (
    <div className='flex'>
      <div 
        className={`bg-gray-200 h-full p-5 pt-8 relative shadow-md ${open ? 'w-72': 'w-20'} duration-700`} 
      >
        <FaChevronLeft 
          className={`bg-white text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
          onClick={() =>setOpen(!open)}
        />
        <div className='inline-flex'>
          <NavLink className='flex flex-shrink-0 items-center mr-4' to='/home'>     
            <img 
              className={`${open ? 'h-10' : 'h-2'} w-auto duration-700`} 
              src={emi_logo} alt='EMI' 
            />
          </NavLink>
        </div>
        <ul className=" pt-2">
          <li>
            <NavLink
              to='/home'
              className={`flex items-center bg-light-white hover:bg-white cursor-pointer rounded-md gap-x-4 p-2 mt-2`}
            >
              <FaHome className='text-2xl block float-left' />
              <span className={` text-base  font-medium flex-1 ${!open && 'hidden'} duration-200 cursor-pointer`}>
                Home
              </span>
            </NavLink>
          </li>
          {Menus.map((menu, index)=>(
            <>
              <li key={index} 
                className={`flex items-center bg-light-white hover:bg-white cursor-pointer rounded-md gap-x-4 p-2 mt-2`}> 
                  <span className='text-2xl block float-left'>
                    {menu.icon ? menu.icon :<FaFolderOpen/>}
                  </span>
                  <span className={` text-base  font-medium flex-1 ${!open && 'hidden'} duration-200 cursor-pointer`} onClick={()=>setSubMenuOpen(!subMenuOpen)}>
                    {menu.title}
                  </span>
                  {menu.submenu && open && (
                    <FaChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={()=>setSubMenuOpen(!subMenuOpen)} />
                  )}
              </li>
                {menu.submenu &&  subMenuOpen  && open && (
                  <ul>
                      {menu.subMenuItems.map((subMenuItem, index)=>(
                          <li 
                            key={index}
                            className={`flex items-center hover:bg-white cursor-pointer rounded-md gap-x-4 p-2 px-6 mt-2`}
                          >
                            <NavLink
                              to={subMenuItem.link}
                              className="flex items-center"
                            >
                              {subMenuItem.title}
                            </NavLink>
                          </li>
                      ))}
                  </ul>
                )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Drawer
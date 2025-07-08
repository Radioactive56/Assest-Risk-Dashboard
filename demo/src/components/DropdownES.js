// import React, { useState, useCallback } from 'react';
 
// const DropdownES = ({ onFilterChange }) => {
//     const [openMenu, setOpenMenu] = useState(null);
//     const [selectedAssetType, setSelectedAssetType] = useState('');
//     const [selectedLocation, setSelectedLocation] = useState('');
//     const [subMenu, setSubMenu] = useState(null);
 
//     const toggleMenu = useCallback((menu) => {
//         setOpenMenu((prev) => (prev === menu ? null : menu));
//         setSubMenu(null); // Reset sub-menu when switching main menu
//     }, []);
 
//     const handleSelection = (type, value) => {
//         switch (type) {
//             case 'assetType':
//                 setSelectedAssetType(value);
//                 break;
//             case 'location':
//                 setSelectedLocation(value);
//                 break;
//             default:
//                 break;
//         }
//         onFilterChange({
//             assetType: type === 'assetType' ? value : selectedAssetType,
//             location: type === 'location' ? value : selectedLocation
//         });
//     };
 
//     const handleSubMenuSelection = (mainType, subType, value) => {
//         if (mainType === 'assetType') {
//             handleSelection('assetType', value);
//         } else if (mainType === 'location') {
//             handleSelection('location', value);
//         }
//         setSubMenu(null); // Close the sub-menu after selection
//     };
 
//     return (
//         <div className="relative inline-block">
//             <button
//                 aria-haspopup="true"
//                 aria-controls="menu-main"
//                 onClick={() => toggleMenu('main')}
//                 className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
//             >
//                 <span className="pr-1 font-semibold flex-1">Filter By</span>
//                 <span>
//                     <svg
//                         className={`fill-current h-4 w-4 transform transition duration-150 ease-in-out ${openMenu === 'main' ? 'rotate-180' : 'rotate-0'}`}
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                     >
//                         <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                     </svg>
//                 </span>
//             </button>
//             {openMenu === 'main' && (
//                 <ul
//                     id="menu-main"
//                     aria-hidden={openMenu !== 'main'}
//                     className="bg-white border rounded-sm absolute transition duration-150 ease-in-out origin-top min-w-32"
//                 >
//                     <li
//                         className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => {
//                             toggleMenu('assetTypeSub');
//                             setSubMenu('assetType');
//                         }}
//                     >
//                         Asset Type
//                     </li>
//                     <li
//                         className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => {
//                             toggleMenu('locationSub');
//                             setSubMenu('location');
//                         }}
//                     >
//                         Location
//                     </li>
//                 </ul>
//             )}
 
//             {subMenu === 'assetType' && openMenu === 'assetTypeSub' && (
//                 <ul
//                     id="menu-asset-type-sub"
//                     aria-hidden={subMenu !== 'assetType'}
//                     className="bg-white border rounded-sm absolute top-full left-0 mt-1 transition duration-150 ease-in-out origin-top min-w-32"
//                 >
//                     <li
//                         className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleSubMenuSelection('assetType', 'Firewalls')}
//                     >
//                         Firewalls
//                     </li>
//                     <li
//                         className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleSubMenuSelection('assetType', 'Routers')}
//                     >
//                         Routers
//                     </li>
//                     <li
//                         className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleSubMenuSelection('assetType', 'Switches')}
//                     >
//                         Switches
//                     </li>
//                 </ul>
//             )}
 
//             {subMenu === 'location' && openMenu === 'locationSub' && (
//                 <ul
//                     id="menu-location-sub"
//                     aria-hidden={subMenu !== 'location'}
//                     className="bg-white border rounded-sm absolute top-full left-0 mt-1 transition duration-150 ease-in-out origin-top min-w-32"
//                 >
//                     <li
//                         className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleSubMenuSelection('location', 'Loc1')}
//                     >
//                         Loc1
//                     </li>
//                     <li
//                         className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleSubMenuSelection('location', 'Loc2')}
//                     >
//                         Loc2
//                     </li>
//                     <li
//                         className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleSubMenuSelection('location', 'Loc3')}
//                     >
//                         Loc3
//                     </li>
//                 </ul>
//             )}
//         </div>
//     );
// };
 
// export default DropdownES;
 
import React, { useState, useCallback } from 'react';
 
const DropdownES = ({ onFilterChange }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [selectedAssetType, setSelectedAssetType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [subMenu, setSubMenu] = useState(null);
 
    const toggleMenu = useCallback((menu) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
        setSubMenu(null); // Reset sub-menu when switching main menu
    }, []);
 
    const handleSelection = (type, value) => {
        if (type === 'assetType') {
            setSelectedAssetType(value);
        } else if (type === 'location') {
           
            setSelectedAssetType(null);
            setSelectedLocation(value);
            console.log(selectedAssetType)
            console.log(selectedLocation)
        }
        onFilterChange({
            assetType: type === 'assetType' ? value : null,
            location: type === 'location' ? value : null
        });
    };
 
    const handleSubMenuSelection = (mainType, value) => {
        handleSelection(mainType, value);
        setSubMenu(null); // Close the sub-menu after selection
    };
 
    return (
        <div className="relative inline-block">
            <button
                aria-haspopup="true"
                aria-controls="menu-main"
                onClick={() => toggleMenu('main')}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
            >
                <span className="pr-1 font-semibold flex-1">Filter By</span>
                <span>
                    <svg
                        className={`fill-current h-4 w-4 transform transition duration-150 ease-in-out ${openMenu === 'main' ? 'rotate-180' : 'rotate-0'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </span>
            </button>
            {openMenu === 'main' && (
                <ul
                    id="menu-main"
                    aria-hidden={openMenu !== 'main'}
                    className="bg-white border rounded-sm absolute transition duration-150 ease-in-out origin-top min-w-32"
                >
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            toggleMenu('assetTypeSub');
                            setSubMenu('assetType');
                        }}
                    >
                        Asset Type
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            toggleMenu('locationSub');
                            setSubMenu('location');
                        }}
                    >
                        Location
                    </li>
                </ul>
            )}
 
            {subMenu === 'assetType' && openMenu === 'assetTypeSub' && (
                <ul
                    id="menu-asset-type-sub"
                    aria-hidden={subMenu !== 'assetType'}
                    className="bg-white border rounded-sm absolute top-full left-0 mt-1 transition duration-150 ease-in-out origin-top min-w-32"
                >
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('assetType', 'Firewalls')}
                    >
                        Firewalls
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('assetType', 'Routers')}
                    >
                        Routers
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('assetType', 'Security Devices')}
                    >
                        Security Devices
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('assetType', 'Security devices')}
                    >
                        Security devices
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('assetType', 'Servers')}
                    >
                        Servers
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('assetType', 'Switches')}
                    >
                        Switches
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('assetType', 'Video confererncing device')}
                    >
                        Video confererncing device
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('assetType', 'Wireless Device')}
                    >
                        Wireless Device
                    </li>
                </ul>
            )}
 
            {subMenu === 'location' && openMenu === 'locationSub' && (
                <ul
                    id="menu-location-sub"
                    aria-hidden={subMenu !== 'location'}
                    className="bg-white border rounded-sm absolute top-full left-0 mt-1 transition duration-150 ease-in-out origin-top min-w-32"
                >
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('location', 'APAC')}
                    >
                        APAC
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('location', 'EMEA')}
                    >
                        EMEA
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('location', 'INDIA')}
                    >
                        INDIA
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('location', 'JAPAN')}
                    >
                        JAPAN
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('location', 'LATAM')}
                    >
                        LATAM
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubMenuSelection('location', 'NOAM')}
                    >
                        NOAM
                    </li>
                </ul>
            )}
        </div>
    );
};
 
export default DropdownES;
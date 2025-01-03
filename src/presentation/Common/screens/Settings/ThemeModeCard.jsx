import React from "react";
import 'output.css'
import 'index.css'

export const ThemeModeCard = ({className}) => {
    return (
        <svg className={`${className} fill-current`} xmlns="http://www.w3.org/2000/svg" width="161" height="105" fill="none">
            <path className={`text-background`}
                  d="M.292 3.549C.292 1.972 1.704.694 3.446.694H157.22c1.743 0 3.155 1.278 3.155 2.855v98.475c0 1.577-1.412 2.855-3.155 2.855H3.446c-1.742 0-3.154-1.278-3.154-2.855V3.549Z"/>
            <path className={`text-card`}
                  d="M6.6 24.956c0-2.364 2.119-4.281 4.732-4.281h38.64c2.614 0 4.732 1.917 4.732 4.281 0 2.365-2.118 4.282-4.731 4.282H11.332c-2.613 0-4.731-1.917-4.731-4.282Z"/>
            <path className={`text-card`}
                  d="M57.859 12.112c0-3.153 2.824-5.71 6.308-5.71h83.59c3.485 0 6.309 2.557 6.309 5.71V93.46c0 3.153-2.824 5.709-6.309 5.709h-83.59c-3.484 0-6.308-2.556-6.308-5.709v-81.35Z"/>
            <path className={`text-card`}
                  d="M19.218 10.684c0-2.364 2.118-4.281 4.731-4.281h26.024c2.613 0 4.731 1.917 4.731 4.281 0 2.365-2.118 4.282-4.731 4.282H23.949c-2.613 0-4.731-1.917-4.731-4.282ZM6.6 37.087c0-2.364 2.119-4.281 4.732-4.281h38.64c2.614 0 4.732 1.917 4.732 4.281 0 2.365-2.118 4.282-4.731 4.282H11.332c-2.613 0-4.731-1.917-4.731-4.282ZM6.6 49.218c0-2.364 2.119-4.281 4.732-4.281h38.64c2.614 0 4.732 1.917 4.732 4.281 0 2.365-2.118 4.282-4.731 4.282H11.332c-2.613 0-4.731-1.917-4.731-4.282ZM6.6 94.888c0-2.364 2.119-4.281 4.732-4.281h38.64c2.614 0 4.732 1.917 4.732 4.281 0 2.365-2.118 4.282-4.731 4.282H11.332c-2.613 0-4.731-1.917-4.731-4.282Z"/>
            <path className={`text-primary`}
                  d="M6.6 9.257c0-1.576 1.413-2.854 3.155-2.854h3.154c1.742 0 3.155 1.278 3.155 2.854v2.855c0 1.576-1.413 2.854-3.155 2.854H9.755c-1.742 0-3.154-1.278-3.154-2.854V9.257Z"/>
        </svg>
    )
}

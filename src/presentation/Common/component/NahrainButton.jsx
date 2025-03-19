import React from "react";
import {CircularProgress} from "@mui/material";

export const NahrainButton = ({className, onClick, isLoading, children}) => {
    return (
        <button
            type={"button"}
            onClick={onClick}
            className={`${className} bg-primary flex items-center text-onPrimary gap-3 rounded-lg w-full justify-center h-14 max-w-full`}>
            {isLoading ? <CircularProgress sx={{color: "rgba(var(--on-primary))"}}/> : children}
        </button>
    )
}

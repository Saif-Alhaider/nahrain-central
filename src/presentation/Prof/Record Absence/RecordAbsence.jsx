import {useState} from "react";
import {ReactComponent as IcCheckMark} from "./resources/Check Circle.svg";
import {ReactComponent as IcAssign} from "./resources/Add Circle.svg";
import {ReactComponent as IcClose} from "./resources/Close Circle.svg";

export const RecordAbsence = () => {
    return (
        <div>
        </div>
    )
}


const AssignCard = ({name}) => {
    const [status, setStatus] = useState("none");

    const handleClick = () => {
        setStatus((prevStatus) =>
            prevStatus === "none" ? "attended" : prevStatus === "attended" ? "absent" : "none"
        );
    };

    return (
        <div className="flex items-center justify-between bg-card p-3 rounded-xl shadow-sm w-full">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"/>
                <span className="text-lg font-medium text-onBackground rtl:text-right">{name}</span>
            </div>
            <button
                className={`flex flex-row items-center justify-center min-w-[150px] text-xl gap-2 px-4 py-2 rounded-lg  font-medium transition ${
                    status === "none" ? "bg-black text-white" :
                        status === "attended" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
                onClick={handleClick}
            >
                <>{
                    status === "none" ? <AttendanceButtonContent title={"Assign"} icon={<IcAssign/>}/>
                        : status === "attended" ? <AttendanceButtonContent title={"Attended"} icon={<IcCheckMark/>}/>
                            : <AttendanceButtonContent title={"Absence"} icon={<IcClose/>}/>}</>
            </button>
        </div>
    );
};


const AttendanceButtonContent = ({title, icon}) => {
    return (
        <>
            <p>{title}</p>
            {icon}
        </>
    )
}

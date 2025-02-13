import React, {useState} from "react";
import {ReactComponent as IcEye} from "presentation/Common/resources/ic_eye.svg";
import {ReactComponent as IcClosedEye} from "presentation/Common/resources/ic_closed_eye.svg";

export const NahrainInput = ({className, type, placeholder}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className={`${className} relative`}>
            <input
                className="text-onBackground max-w-full w-full p-4 rounded-lg bg-transparent border border-strokeGray transition-colors focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                type={type === "password" && showPassword ? "text" : type}
                placeholder={placeholder}/>
            {
                type === "password" ?
                    <button
                        type="button"
                        className="cursor-pointer absolute top-4 end-4"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IcClosedEye/> : <IcEye/>}
                    </button>
                    : null
            }
        </div>
    )
}
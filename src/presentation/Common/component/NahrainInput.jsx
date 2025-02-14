import React, {useState} from "react";
import {ReactComponent as IcEye} from "presentation/Common/resources/images/ic_eye.svg";
import {ReactComponent as IcClosedEye} from "presentation/Common/resources/images/ic_closed_eye.svg";

export const NahrainInput = ({className, type, placeholder, onChange}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className={`${className} relative`}>
            <input
                className="text-onBackground max-w-full w-full p-4 rounded-lg bg-transparent border border-strokeGray transition-colors focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                type={type === "password" && showPassword ? "text" : type}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
            {
                type === "password" ?
                    <button
                        type="button"
                        className="cursor-pointer absolute top-4 end-4"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IcClosedEye className={`text-strokeGray`}/> : <IcEye className={`text-strokeGray`}/>}
                    </button>
                    : null
            }
        </div>
    )
}
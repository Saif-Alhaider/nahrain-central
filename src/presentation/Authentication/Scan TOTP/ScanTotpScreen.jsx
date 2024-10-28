import {BaseAuthentication} from "../BaseAuthentication";
import finishSignup from "../Finish Signup/resources/finishSignup.png";
import React from "react";
import QrCode from './resources/QR Code.png'

export const ScanTotpScreen = () => {
    return (
        <BaseAuthentication
            image={finishSignup}
            imageClassName="translate-y-44 scale-150"
            description="Professors can publish student grades on Nahrain Central, allowing students to easily view their results and track their academic progress through the platform.">
            <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">configure
                authenticator app</h1>
            <img src={QrCode} alt="qr code" className="w-48 h-48 my-4 mx-auto"/>
            <p className="text-sm text-onBackgroundCaption mt-6 xl:text-start text-center">Enter the verification code
                displayed in the Google Authenticator app or TOTP app, then proceed.</p>
            <h1 className="text-[24px] text-onBackground w-full text-start mt-4 font-semibold">Enter Verification Code</h1>
            <div className="flex flex-row justify-between w-full xl:mt-6 mt-8 h-16 xl:gap-8 gap-4">
                {Array.from({length: 6}).map((_, index) => (
                    <input
                        type="number"
                        onInput={(e) => (e.target.value = e.target.value.slice(0, e.target.maxLength))}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        maxLength="1"
                        key={index} // Use a unique key for each element
                        className="border-2 border-strokeGrey text-2xl font-semibold rounded-lg max-w-14 aspect-[3/4] w-full h-auto bg-transparent text-center text-onBackground focus:outline-none focus:border-secondary"
                    ></input>
                ))}
            </div>
            <button className="bg-primary w-full max-w-full text-white h-14 rounded-lg text-[24px] mt-6">Continue
            </button>
            <button className="border-2 border-strokeGrey w-full max-w-full text-white h-14 rounded-lg text-[24px] mt-4">Skip
            </button>
        </BaseAuthentication>
    )
}

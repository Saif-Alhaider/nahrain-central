import React from "react";
import {BaseAuthentication} from "../BaseAuthentication";
import finishSignup from "./resources/finishSignup.png"

export const FinishSignup = () => {
    return (
        <BaseAuthentication
            image={finishSignup}
            imageClassName="translate-y-44 scale-150"
            description="Professors can publish student grades on Nahrain Central, allowing students to easily view their results and track their academic progress through the platform.">
            <div className="xl:flex-grow-0 flex-grow xl:mt-0 mt-6">
                <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">The account
                    has been successfully created!</h1>
                <p className="text-sm text-onBackgroundCaption mt-6 xl:text-start text-center">Thank you for registering! Please wait for the head
                    of the department to add your account to the system. You will be notified once your account is
                    activated. The head of the department can add accounts for individuals who have registered or have
                    not yet created an account.</p>
            </div>
        </BaseAuthentication>
    )
}

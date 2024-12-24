import {BaseAuthentication} from "../BaseAuthentication";
import TotpImage from "./resources/img_totp.png"
import React from "react";
import {useTranslation} from "react-i18next";

export const TotpScreen = () => {
    const [t, i18] = useTranslation("global");
    return (
        <BaseAuthentication image={TotpImage} imageClassName="translate-y-1/4"
                            description={t('professors_can_publish_student_grades')}>
            <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">{t('enter_verification_code')}</h1>
            <p className="text-onBackground text-sm xl:text-start text-center">{t('enter_the_6_digit_security_code_from_your_authenticator_app')}</p>

            <div className="flex flex-row justify-between w-full xl:mt-6 mt-8 h-16 xl:gap-8 gap-4 mb-14">
                {Array.from({length: 6}).map((_, index) => (
                    <input
                        type="number"
                        onInput={(e) => (e.target.value = e.target.value.slice(0, e.target.maxLength))}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        maxLength="1"
                        key={index} // Use a unique key for each element
                        className="border-2 border-strokeGray text-2xl font-semibold rounded-lg max-w-14 aspect-[3/4] w-full h-auto bg-transparent text-center text-onBackground focus:outline-none focus:border-secondary"
                    ></input>
                ))}
            </div>
            <button
                className="bg-primary xl:mt-14 mt-auto w-full max-w-full text-white h-14 rounded-lg text-[24px]">{t('continue')}</button>
        </BaseAuthentication>
    )
}

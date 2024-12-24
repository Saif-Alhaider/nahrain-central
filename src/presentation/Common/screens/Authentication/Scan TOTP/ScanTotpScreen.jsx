import {BaseAuthentication} from "../BaseAuthentication";
import finishSignup from "../Finish Signup/resources/finishSignup.png";
import React from "react";
import QrCode from './resources/QR Code.png'
import {useTranslation} from "react-i18next";

export const ScanTotpScreen = () => {
    const [t] = useTranslation("global");
    return (
        <BaseAuthentication
            image={finishSignup}
            imageClassName="translate-y-44 scale-150"
            description={t('professors_can_publish_student_grades')}>
            <h1 className="xl:text-[32px] lg:text-[32px] text-[24px] text-onBackground  xl:text-start text-center font-semibold">{t("configure_authenticator_app")}</h1>
            <div className="h-auto my-6">
                <img src={QrCode} alt="qr code" className="w-40 mx-auto"/>
            </div>
            <p className="text-sm text-onBackgroundCaption xl:text-start text-center">{t("enter_verification_code_displayed_in_google_authenticator")}</p>
            <h1 className="text-[24px] text-onBackground  text-start mt-4 font-semibold">{t('enter_verification_code')}</h1>
            <div className="flex flex-row justify-between xl:my-6 mt-2 mb-4 h-16 w-full xl:gap-8 gap-4">
                {Array.from({length: 6}).map((_, index) => (
                    <input
                        type="number"
                        onInput={(e) => (e.target.value = e.target.value.slice(0, e.target.maxLength))}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        maxLength="1"
                        key={index} // Use a unique key for each element
                        className="border-2 border-strokeGray text-2xl font-semibold rounded-lg min-w-10 max-w-12 flex-grow aspect-[3/4] h-auto bg-transparent text-center text-onBackground focus:outline-none focus:border-secondary"
                    ></input>
                ))}
            </div>
            <button
                className="bg-primary text-onPrimary flex-grow max-h-14 w-full rounded-lg text-[24px]">{t('continue')}
            </button>
            <button
                className="border-2 border-strokeGray text-white flex-grow w-full max-h-14 rounded-lg text-[24px] mt-4">{t('skip')}
            </button>
        </BaseAuthentication>
    )
}

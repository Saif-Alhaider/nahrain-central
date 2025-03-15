import {NahrainInput} from "../../Common/component/NahrainInput";
import {DropDown} from "../../Common/component/DropDown";
import {MenuItem} from "@mui/material";
import {NahrainButton} from "../../Common/component/NahrainButton";
import React from "react";
import {ReactComponent as IcEmail} from "presentation/Common/resources/images/ic_email.svg";
import {ReactComponent as IcUsers} from "presentation/Common/resources/images/ic_users.svg";
import {ReactComponent as IcPhone} from "presentation/Common/resources/images/ic_phone.svg";
import {ReactComponent as IcTextSquare} from "presentation/Common/resources/images/ic_text_square.svg";
import {DatePicker} from "presentation/Common/component/DatePicker"
import {useTranslation} from "react-i18next";


export const DialogSidebarInputUserInfo = ({onClickNext}) => {
    const [t] = useTranslation("global");
    return (
        <div className={`max-w-[700px] mx-auto relative`}>
            <h1 className={`text-xl text-onBackground font-semibold`}>{t("personal_info")} <span
                className={`text-error`}>*</span></h1>
            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("full_name")}</h1>
                <NahrainInput type={`text`} className={`mt-2`} placeholder={"محمد على كاظم"}
                              icon={<IcTextSquare/>} onChange={() => {
                }}/>
            </div>

            <div className={`mt-4`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("date_of_birth")}</h1>
                <DatePicker className={`mt-2`}/>
            </div>

            <div className={`mt-4`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("gender")}</h1>
                <DropDown
                    icon={<IcUsers className={`size-6 text-onBackgroundCaption`}/>}
                    currentValue={null}
                    className={`!mt-2`}
                    placeholder={t("select")}
                    items={[t('male'), t('female')].map((item) => (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))}
                />
            </div>
            <h1 className={`text-xl mt-6 text-onBackground font-semibold`}>{t("contact_info")} <span
                className={`text-error`}>*</span></h1>
            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("email")}</h1>
                <NahrainInput type={`email`} className={`mt-2`} placeholder={"ali@nahrainuniv.edu.iq"}
                              icon={<IcEmail/>} onChange={() => {
                }}/>
            </div>
            <div className={`mt-4`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("phone_number")}</h1>
                <NahrainInput type={`tel`} className={`mt-2`} placeholder={"+964"}
                              icon={<IcPhone/>} onChange={() => {
                }}/>
            </div>

            <h1 className={`text-xl mt-6 text-onBackground font-semibold`}>{t("additional_info")}</h1>
            <div className={`bg-card relative`}>
                <h1 className={`font-medium text-onBackground text-[16px] mt-6`}>{t("providence")}</h1>
                <DropDown
                    currentValue={null}
                    className={`!mt-2`}
                    placeholder={t("select")}
                    items={[
                        t('Al-Anbar'),
                        t('Babylon'),
                        t('Baghdad'),
                        t('Basra'),
                        t('Dhi Qar'),
                        t('Al-Qadisiyyah'),
                        t('Diyala'),
                        t('Duhok'),
                        t('Erbil'),
                        t('Karbala'),
                        t('Kirkuk'),
                        t('Maysan'),
                        t('Muthanna'),
                        t('Najaf'),
                        t('Nineveh'),
                        t('Saladin'),
                        t('Sulaymaniyah'),
                        t('Wasit')
                    ]
                        .map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                />
            </div>
            <div className={`sticky bg-card w-full bottom-0 py-4 mt-2`}>
                <NahrainButton onClick={() => {onClickNext()
                }} className={`w-full`}>
                    <p className="text-2xl font-semibold">{t("create_new_user")}</p>
                </NahrainButton>
            </div>
        </div>
    )
}

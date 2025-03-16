import {NahrainInput} from "../../Common/component/NahrainInput";
import {DropDown} from "../../Common/component/DropDown";
import {CircularProgress, MenuItem} from "@mui/material";
import {NahrainButton} from "../../Common/component/NahrainButton";
import React, {useCallback, useContext, useState} from "react";
import {ReactComponent as IcEmail} from "presentation/Common/resources/images/ic_email.svg";
import {ReactComponent as IcUsers} from "presentation/Common/resources/images/ic_users.svg";
import {ReactComponent as IcPhone} from "presentation/Common/resources/images/ic_phone.svg";
import {ReactComponent as IcTextSquare} from "presentation/Common/resources/images/ic_text_square.svg";
import {DatePicker} from "presentation/Common/component/DatePicker"
import {useTranslation} from "react-i18next";
import {AdminConfig, CreateNewUserRequest} from "../../../api/config/AuthConfig";
import {postRequest} from "../../../api/postRequest";
import {AuthContext} from "../../../context/AuthContext";


export const DialogSidebarInputUserInfo = ({role,onClickNext}) => {
    const [t] = useTranslation("global");
    const [isLoading, setIsLoading] = useState(false);
    const {accessToken} = useContext(AuthContext)

    const [userData, setUserData] = useState({
        fullName: "",
        birthDate: "",
        gender: "",
        email: "",
        phoneNumber: "",
        province: "",
        role: role
    });

    const onClickSubmitInfo = useCallback(() => {
        setIsLoading(true);
        const requestBody = CreateNewUserRequest(userData);

        postRequest(AdminConfig.CREATE_NEW_USER, requestBody, onSuccess, onFail, accessToken);
    }, [accessToken, userData]);


    const onSuccess = () => {
        setIsLoading(false);
        onClickNext()
    }
    const onFail = () => setIsLoading(false);

    const handleChange = (field, value) => {
        setUserData((prev) => ({...prev, [field]: value}));
    };
    return (
        <div className={`max-w-[700px] mx-auto relative`}>
            <h1 className={`text-xl text-onBackground font-semibold`}>{t("personal_info")} <span
                className={`text-error`}>*</span></h1>
            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("full_name")}</h1>
                <NahrainInput type={`text`} className={`mt-2`} placeholder={"محمد على كاظم"}
                              icon={<IcTextSquare/>} onChange={(e) => handleChange("fullName", e)}/>
            </div>

            <div className={`mt-4`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("date_of_birth")}</h1>
                <DatePicker className={`mt-2`} onChange={(date) => handleChange("birthDate", date)}/>
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
                    onValueChange={(value) => {
                        if (value === t('male')) {
                            handleChange("gender", "MALE")
                        } else {
                            handleChange("gender", "FEMALE")
                        }
                    }}
                />
            </div>
            <h1 className={`text-xl mt-6 text-onBackground font-semibold`}>{t("contact_info")} <span
                className={`text-error`}>*</span></h1>
            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("email")}</h1>
                <NahrainInput type={`email`} className={`mt-2`} placeholder={"ali@nahrainuniv.edu.iq"}
                              icon={<IcEmail/>} onChange={(email) => handleChange("email", email)}/>
            </div>
            <div className={`mt-4`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("phone_number")}</h1>
                <NahrainInput type={`tel`} className={`mt-2`} placeholder={"+964"}
                              icon={<IcPhone/>} onChange={(phone) => handleChange("phoneNumber", phone)}/>
            </div>

            <h1 className={`text-xl mt-6 text-onBackground font-semibold`}>{t("additional_info")}</h1>
            <div className={`bg-card relative`}>
                <h1 className={`font-medium text-onBackground text-[16px] mt-6`}>{t("province")}</h1>
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
                    onValueChange={(value) => handleChange("province", value)}

                />
            </div>
            <div className={`sticky bg-card w-full bottom-0 py-4 mt-2`}>
                <NahrainButton onClick={() => {
                    onClickSubmitInfo()
                }} className={`w-full`}>
                    {isLoading ? <CircularProgress sx={{color: "rgba(var(--on-primary))"}}/> :
                        <p className="text-2xl font-semibold">{t("continue")}</p>}
                </NahrainButton>
            </div>
        </div>
    )
}

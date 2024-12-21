import React, {useContext} from "react";
import 'output.css'
import 'index.css'
import {ThemeModeCard} from "./ThemeModeCard";
import {ThemeSplitModeCard} from "./ThemeSplitModeCard";
import {DropDown} from "../../component/DropDown";
import {NahrainThemeContext} from "../../../../context/NahrainThemeContext";
import {useTranslation} from "react-i18next";
import {supportedLanguages} from "../../../../translation/supportedLanguages";
import i18next from "i18next";
import {MenuItem} from "@mui/material";


export const SettingsScreen = () => {
    const {currentTheme, setCurrentTheme, currentLanguage, setCurrentLanguage} = useContext(NahrainThemeContext)
    const [t, i18] = useTranslation("global");

    const direction = supportedLanguages[currentLanguage].direction
    return (
        <div className={'bg-background scroll-smooth transition-colors duration-200 ease-linear py-6 h-fit'}
             dir={direction}>
            <div className='flex flex-col gap-4 mx-6'>
                <h1 className='font-bold text-[24px] text-onBackground'>{t("appearance")}</h1>
                <p className='text-onBackgroundCaption text-[20px]'>{t("change_how_your_public_dashboard_looks_and_feels")}</p>
                <hr className="border border-strokeGray unselectable"/>
            </div>
            <div className='mt-4 lg:mt-12 flex xl:flex-row xl:gap-0 flex-col gap-4'>
                <div className='flex flex-col gap-4 mx-6'>
                    <h1 className='font-medium text-[24px] text-onBackground'>{t("theme")}</h1>
                    <p className='text-onBackgroundCaption text-[20px] overflow-hidden text-ellipsis line-clamp-3'>{t("change_the_user_interface_colors_to_match_your_preferences_or_usage_environment")}</p>
                </div>
                <div
                    className='flex flex-row gap-4 flex-grow w-full px-6 lg:overflow-x-visible overflow-x-auto no-scrollbar'>
                    <div className={'flex flex-col w-[209px] cursor-pointer'} onClick={() => {
                        setCurrentTheme("light")
                    }}>
                        <ThemeModeCard
                            className={`light p-6 box-content bg-softGray rounded-xl ${currentTheme === "light" ? "border-4 border-primary" : ""}`}/>
                        <h1 className={'font-medium text-[20px] text-onBackground mt-4'}>{t("light_theme")}</h1>
                        <p className={'text-onBackgroundCaption text-[16px] leading-8 mt-2'}>{t("enhances_visibility_in_bright_lighting")}</p>
                    </div>
                    <div className={'flex flex-col w-[209px] cursor-pointer'} onClick={() => {
                        setCurrentTheme("dark")
                    }}>
                        <ThemeModeCard
                            className={`dark p-6 box-content bg-softGray rounded-xl ${currentTheme === "dark" ? "border-4 border-primary" : ""}`}/>
                        <h1 className={'font-medium text-[20px] text-onBackground mt-4'}>{t("dark_theme")}</h1>
                        <p className={'text-onBackgroundCaption text-[16px] leading-8 mt-2'}>{t("comfortable_for_the_eyes_in_low_light")}</p>
                    </div>
                    <div className={'flex flex-col w-[209px] cursor-pointer'} onClick={() => {
                        setCurrentTheme("deviceTheme")
                    }}>
                        <ThemeSplitModeCard
                            className={`p-6 box-content bg-softGray rounded-xl ${currentTheme === "deviceTheme" ? "border-4 border-primary" : ""}`}/>
                        <h1 className={'font-medium text-[20px] text-onBackground mt-4'}>{t("system_theme")}</h1>
                        <p className={'text-onBackgroundCaption text-[16px] leading-8 mt-2'}>{t("based_on_system_settings")}</p>
                    </div>

                </div>
            </div>
            <hr className="border border-strokeGray unselectable mt-4 mx-6"/>
            <div className={'mx-6 lg:mt-8 mt-4 flex lg:flex-row flex-col justify-between lg:items-center gap-2'}>
                <div className={'flex flex-col justify-between'}>
                    <h1 className='font-medium text-[24px] text-onBackground'>{t("language")}</h1>
                    <p className='text-onBackgroundCaption text-[20px] overflow-hidden text-ellipsis '>{t("the_default_language_for_displaying_the_main_dashboard")}</p>
                </div>
                <DropDown currentValue={currentLanguage}
                          items={Object.entries(supportedLanguages).map(([key, value]) => (
                              <MenuItem value={key} key={key}>{value.name}</MenuItem>
                          ))
                          } onValueChange={onLanguageValueChange}
                          className={'w-fit'}/>
            </div>
            <hr className="border border-strokeGray unselectable mt-4 mx-6"/>
            <div className={'mx-6 lg:my-8 mt-4 flex lg:flex-row flex-col justify-between lg:items-center gap-2'}>
                <div className={'flex flex-col justify-between'}>
                    <h1 className='font-medium text-[24px] text-onBackground'>{t("time")}</h1>
                    <p className='text-onBackgroundCaption text-[20px] overflow-hidden text-ellipsis '>{t("specify_whether_you_want_to_display_the_time_in_12_hour_or_24_hour_format")}</p>
                </div>
                <DropDown currentValue={"12h"}
                          items={[
                              <MenuItem value={"12h"} key="12h">12h</MenuItem>,
                              <MenuItem value={"24h"} key="24h">24h</MenuItem>
                          ]}
                          className={'w-fit'}/>
            </div>
        </div>
    )

    function onLanguageValueChange(languageCode) {
        setCurrentLanguage(languageCode)
        i18next.changeLanguage(languageCode)
    }
}


import React, {useContext, useState} from "react";
import 'output.css'
import 'index.css'
import {ThemeModeCard} from "./ThemeModeCard";
import {ThemeSplitModeCard} from "./ThemeSplitModeCard";
import {DropDown} from "../../component/DropDown";
import {NahrainThemeContext} from "../../../../context/NahrainThemeContext";


export const SettingsScreen = () => {
    const {setCurrentTheme} = useContext(NahrainThemeContext)
    const [currentTheme, updateCurrentTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });
    return (
        <div className={'bg-background scroll-smooth transition-colors duration-200 ease-linear py-6 '}>
            <div className='flex flex-col gap-4 mx-6'>
                <h1 className='font-bold text-[24px] text-onBackground'>Appearance</h1>
                <p className='text-onBackgroundCaption text-[20px]'>change how your public dashboard looks and
                    feels.</p>
                <hr className="border border-strokeGray unselectable"/>
            </div>
            <div className='mt-4 lg:mt-12 flex xl:flex-row xl:gap-0 flex-col gap-4'>
                <div className='flex flex-col gap-4 ms-6'>
                    <h1 className='font-medium text-[24px] text-onBackground'>Theme</h1>
                    <p className='text-onBackgroundCaption text-[20px] overflow-hidden text-ellipsis line-clamp-3'>change
                        the user interface colors to match your
                        preferences or usage environment.</p>
                </div>
                <div
                    className='flex flex-row gap-4 flex-grow w-full px-6 lg:overflow-x-visible overflow-x-auto no-scrollbar'>
                    <div className={'flex flex-col w-[209px] cursor-pointer'} onClick={() => {
                        updateCurrentTheme("light")
                        setCurrentTheme("light")
                    }}>
                        <ThemeModeCard
                            className={`light p-6 box-content bg-softGray rounded-xl ${currentTheme === "light" ? "border-4 border-primary" : ""}`}/>
                        <h1 className={'font-medium text-[20px] text-onBackground mt-4'}>Light Theme</h1>
                        <p className={'text-onBackgroundCaption text-[16px] leading-8 mt-2'}>Enhances visibility in
                            bright lighting.</p>
                    </div>
                    <div className={'flex flex-col w-[209px] cursor-pointer'} onClick={() => {
                        updateCurrentTheme("dark")
                        setCurrentTheme("dark")
                    }}>
                        <ThemeModeCard
                            className={`dark p-6 box-content bg-softGray rounded-xl ${currentTheme === "dark" ? "border-4 border-primary" : ""}`}/>
                        <h1 className={'font-medium text-[20px] text-onBackground mt-4'}>Dark Theme</h1>
                        <p className={'text-onBackgroundCaption text-[16px] leading-8 mt-2'}>Comfortable for the eyes in
                            low light.</p>
                    </div>
                    <div className={'flex flex-col w-[209px] cursor-pointer'} onClick={() => {
                        updateCurrentTheme("deviceTheme")
                        setCurrentTheme("deviceTheme")
                    }}>
                        <ThemeSplitModeCard
                            className={`p-6 box-content bg-softGray rounded-xl ${currentTheme === "deviceTheme" ? "border-4 border-primary" : ""}`}/>
                        <h1 className={'font-medium text-[20px] text-onBackground mt-4'}>System Theme</h1>
                        <p className={'text-onBackgroundCaption text-[16px] leading-8 mt-2'}>Based on system
                            settings.</p>
                    </div>

                </div>
            </div>
            <hr className="border border-strokeGray unselectable mt-4 mx-6"/>
            <div className={'mx-6 lg:mt-8 mt-4 flex lg:flex-row flex-col justify-between lg:items-center gap-2'}>
                <div className={'flex flex-col justify-between'}>
                    <h1 className='font-medium text-[24px] text-onBackground'>Language</h1>
                    <p className='text-onBackgroundCaption text-[20px] overflow-hidden text-ellipsis '>The default
                        language for displaying the <br className={'hidden lg:inline'}/>main dashboard.</p>
                </div>
                <DropDown text={"English"} items={["العربية"]} className={'w-fit'}/>
            </div>
            <hr className="border border-strokeGray unselectable mt-4 mx-6"/>
            <div className={'mx-6 lg:my-8 mt-4 flex lg:flex-row flex-col justify-between lg:items-center gap-2'}>
                <div className={'flex flex-col justify-between'}>
                    <h1 className='font-medium text-[24px] text-onBackground'>Time</h1>
                    <p className='text-onBackgroundCaption text-[20px] overflow-hidden text-ellipsis '>The default
                        language for displaying<br className={'hidden lg:inline'}/>the main dashboard.</p>
                </div>
                <DropDown text={"12h"} items={["24h"]} className={'w-fit'}/>
            </div>
        </div>
    )
}

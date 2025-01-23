import 'output.css'
import 'index.css'
import LectureImage from "./resources/image 1.png"
import {ReactComponent as IcList} from "./resources/ic_list.svg"
import {DropDown} from "../../Common/component/DropDown";
import React, {useContext} from "react";
import {MenuItem} from "@mui/material";
import {useTranslation} from "react-i18next";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";

export const ProfRecordedLectures = () => {
    const [t] = useTranslation("global");
    const {isDialogSidebarVisible, setIsDialogSidebarVisible} = useContext(NahrainThemeContext)

    return (<div className={"h-fit"}>
        <div className=" flex flex-wrap gap-4 justify-between px-6 pt-6">
            <button
                className="bg-primary text-onPrimary text-nowrap rounded-lg text-xl px-4 py-2 "
                onClick={()=> {
                    setIsDialogSidebarVisible(!isDialogSidebarVisible)
                }


                }>{t('publish_a_lecture')}
            </button>
            <div className={"flex flex-wrap gap-2"}>
                <DropDown
                    currentValue={t('first_and_second_course')}
                    items={[t('first_and_second_course'), t('first_course'), t('second_course')].map((item) => (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))}
                />

                <DropDown
                    currentValue={t("theoretical_and_lab")}
                    items={[t("theoretical_and_lab"), t("theoretical"), t("lab")].map((item) => (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))}
                />
            </div>
        </div>
        <div
            className="grid  sm:grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-6 mt-6 pb-6 px-6 pt-6">
            <LecturesPlayListCard numberOfLectures={10} ProfName={"د. اسماء حميد"} SubjectName={"DSP course 1"}/>
            <LecturesPlayListCard numberOfLectures={36} ProfName={"د. اسماء حميد"} SubjectName={"DSP course 2"}/>
            <LecturesPlayListCard numberOfLectures={12} ProfName={"د. اسماء حميد"} SubjectName={"DSP Lab course 2"}/>
        </div>
    </div>)
}

export const LecturesPlayListCard = ({numberOfLectures, ProfName, SubjectName}) => {
    return (<div className="min-w-[268px] sm:w-full">
        <div className={"relative cursor-pointer"}>
            <img className="w-full  object-cover rounded-lg" src={LectureImage} alt="lecture content"/>
            <div
                className={"absolute bottom-2 start-2 bg-onBackgroundCaption light flex flex-row w-fit gap-2 px-1 rounded text-onPrimary"}>
                <IcList/>
                <p>{numberOfLectures} Lectures</p>
            </div>
        </div>
        <h1 className="text-onBackground mt-4 text-[24px] font-medium line-clamp-1">{SubjectName}</h1>
        <p className="mt-2 text-onBackgroundCaption">{ProfName}</p>
    </div>)
}

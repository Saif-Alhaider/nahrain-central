import 'output.css'
import 'index.css'
import LectureImage from "./resources/image 1.png"
import {ReactComponent as IcList} from "./resources/ic_list.svg"
import {DropDown} from "../../Common/component/DropDown";
import React from "react";

export const ProfRecordedLectures = () => {
    return (<div className={"w-full h-full p-6"}>
        <div className="w-full flex flex-wrap gap-4 justify-between">
            <button
                className="bg-primary text-onPrimary text-nowrap rounded-lg text-xl px-4 py-2 ">Publish a Lecture
            </button>
            <div className={"flex flex-row gap-2"}>
                <DropDown text={"All"} items={["First Course", "Second Course",]}/>
                <DropDown text={"Lab"} items={["Theoretical"]}/>
            </div>
        </div>
        <div
            className="grid  sm:grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-6 mt-6 pb-6">
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

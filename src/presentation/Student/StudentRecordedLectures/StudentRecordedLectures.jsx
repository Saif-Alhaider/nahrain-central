import 'output.css'
import 'index.css'
import LectureImage from "./resources/image 1.png"
import {ReactComponent as IcList} from "./resources/ic_list.svg"
import {DropDown} from "../../Common/component/DropDown";

export const StudentRecordedLectures = () => {
    return (<div className={"w-full h-full p-6"}>
            <div className={"flex flex-row gap-2"}>
                <DropDown text={"First Course"} items={["Second Course", "All"]}/>
                <DropDown text={"Lab"} items={["Theoretical"]}/>
            </div>
            <div
                className="grid  sm:grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-6 mt-6 pb-6">
                <LecturesPlayListCard numberOfLectures={8} ProfName={"استاذ كريم مظلوم"} SubjectName={"physics course 1"}/>
                <LecturesPlayListCard numberOfLectures={1} ProfName={"د.علي عبد الرحمن"} SubjectName={"Information Course 2"}/>
                <LecturesPlayListCard numberOfLectures={5} ProfName={"م.م ملاذ ناطق"} SubjectName={"Arabic"}/>
                <LecturesPlayListCard numberOfLectures={3} ProfName={"م.م زينة كريم"} SubjectName={"English"}/>
                <LecturesPlayListCard numberOfLectures={12} ProfName={"د.قصي"} SubjectName={"Field Course 1"}/>
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

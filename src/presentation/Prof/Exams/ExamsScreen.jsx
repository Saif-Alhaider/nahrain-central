import {DetailedActionCard} from "../../Common/component/DetailedActionCard";
import {DropDown} from "../../Common/component/DropDown";
import React from "react";
import {ReactComponent as IcBook} from "./resources/ic_book.svg";
import {ReactComponent as IcClock} from "./resources/ic_clock.svg";
import {ReactComponent as IcNoteBook} from "./resources/ic_notebook.svg";
import {MenuItem} from "@mui/material";

export const ExamsScreen = ({className}) => {
    return (<div className={`${className} w-full bg-background p-6`}>
        <DetailedActionCard title={"Create New Exam"}
                            description={"Design and schedule a new exam. Specify the course, date, and details to ensure a seamless evaluation process."}
                            buttonTitle={"Create New Exam"}
        />

        <div className="flex flex-wrap gap-2 xl:mt-8 mt-6">
            <DropDown
                currentValue="Freshman"
                items={["Freshman","Sophomore", "Junior", "Senior"].map((item) => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
            />

            <DropDown
                currentValue="Theoretical and Lab"
                items={["Theoretical and Lab","Theoretical", "Lab"].map((item) => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
            />

            <DropDown
                currentValue="Homework and Exams"
                items={["Homework and Exams","Homework", "Exams", "Quiz"].map((item) => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
            />
        </div>
        <div className={"flex flex-col gap-4 mt-4 h-fit"}>
            <ExamCard title="Nyquist Theorem and QAM Analysis" dayOfWeek="WED" dayOfMonth={24}
                      examFormat={"Lab"} assessmentType={"Quiz 2"} startTime={"10:00"} endTime={"10:30"}
                      material={"Communication 2"} stage={"Sophomore"}/>
            <ExamCard title="Analog Modulation" dayOfWeek="MON" dayOfMonth={22}
                      examFormat={"Theoretical"} assessmentType={"Midterm 2"} startTime={"10:00"} endTime={"10:30"}
                      material={"Communication 1"} stage={"Junior"}/>
        </div>
    </div>)
}


const ExamCard = ({
                      className,
                      title,
                      dayOfWeek,
                      dayOfMonth,
                      assessmentType,
                      examFormat,
                      startTime,
                      endTime,
                      material,
                      stage
                  }) => {
    return (
        <div
            className={`${className} flex flex-wrap px-6 py-4 rounded-2xl gap-6 border-[1px] border-strokeGray`}>
            <div className={"flex flex-row gap-6"}>
                <div className={"flex flex-col gap-4 items-center w-fit"}>
                    <p className={"text-xl text-primary"}>{dayOfWeek}</p>
                    <p className={"text-[56px] text-primary leading-10"}>{dayOfMonth}</p>
                </div>
                <div className={`w-[1.5px] bg-strokeGray h-[inherit]`}/>
                <div className={`flex flex-col gap-2 w-fit`}>
                    <div className={`flex flex-row gap-2 items-center text-onBackground`}><IcBook/> <p className={"line-clamp-1"}>{assessmentType} - {examFormat}</p>
                    </div>
                    <div className={`flex flex-row gap-2 items-center text-onBackground`}><IcClock/> <p>{startTime} - {endTime}</p></div>
                    <div className={`flex flex-row gap-2 items-center text-onBackground`}><IcNoteBook className={"size-8"}/> <p
                        className={"line-clamp-1 "}>{material} - {stage}</p></div>
                </div>
            </div>
            <div className={"flex flex-col gap-2"}>
                <p className={"text-[20px] font-semibold text-onBackground"}>{title}</p>
                <div className={"flex flex-row gap-2"}>
                    <div className={"relative w-[60px]"}>
                        <img src={"https://picsum.photos/200"} alt={"avatar"}
                             className={"rounded-[50%] size-6 relative z-[31]"}/>
                        <img src={"https://picsum.photos/201"} alt={"avatar"}
                             className={"rounded-[50%] size-6 absolute top-0 left-[12px] z-30"}/>
                        <img src={"https://picsum.photos/202"} alt={"avatar"}
                             className={"rounded-[50%] size-6 absolute top-0 left-[24px] z-20"}/>
                        <img src={"https://picsum.photos/203"} alt={"avatar"}
                             className={"rounded-[50%] size-6 absolute top-0 left-[36px] z-10"}/>
                    </div>
                    <p className={"text-[16px] text-secondary"}>view all students</p>
                </div>

            </div>
        </div>
    )
}
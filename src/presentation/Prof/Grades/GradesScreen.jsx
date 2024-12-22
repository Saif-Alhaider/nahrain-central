import "output.css"
import 'index.css'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {DropDown} from "presentation/Common/component/DropDown"
import {DetailedActionCard} from "../../Common/component/DetailedActionCard";
import {MenuItem} from "@mui/material";
import {useTranslation} from "react-i18next";


const products = [
    {
        "name": "أحمد علي",
        "absence_hours": 5,
        "allExams": ["Mid 1", "Mid 2", "Quiz 1", "Quiz 2", "Homework 1"],
        "exams": [
            {"name": "Mid 1", "value": 25, "percentage": 30},
            {"name": "Mid 2", "value": 20, "percentage": 30},
            {"name": "Quiz 1", "value": 13, "percentage": 15},
            {"name": "Homework 1", "value": 7, "percentage": 10},
            {"name": "Quiz 2", "value": 10, "percentage": 15}
        ]
    },
    {
        "name": "فاطمة الزهراء",
        "absence_hours": 3,
        "exams": [
            {"name": "Mid 1", "value": 20, "percentage": 30},
            {"name": "Mid 2", "value": 25, "percentage": 30},
            {"name": "Quiz 1", "value": 13, "percentage": 15},
            {"name": "Homework 1", "value": 9, "percentage": 10},
            {"name": "Quiz 2", "value": 10, "percentage": 15}
        ]
    },
    {
        "name": "محمود سعيد",
        "absence_hours": 8,
        "exams": [
            {"name": "Mid 1", "value": 18, "percentage": 30},
            {"name": "Mid 2", "value": 20, "percentage": 30},
            {"name": "Quiz 1", "value": 12, "percentage": 15},
            {"name": "Homework 1", "value": 5, "percentage": 10},
            {"name": "Quiz 2", "value": 7, "percentage": 15}
        ]
    },
    {
        "name": "سارة محمد",
        "absence_hours": 2,
        "exams": [
            {"name": "Mid 1", "value": 28, "percentage": 30},
            {"name": "Mid 2", "value": 27, "percentage": 30},
            {"name": "Quiz 1", "value": 12, "percentage": 15},
            {"name": "Homework 1", "value": 8, "percentage": 10},
            {"name": "Quiz 2", "value": 10, "percentage": 15}
        ]
    },
    {
        "name": "يوسف إبراهيم",
        "absence_hours": 6,
        "exams": [
            {"name": "Mid 1", "value": 22, "percentage": 30},
            {"name": "Mid 2", "value": 23, "percentage": 30},
            {"name": "Quiz 1", "value": 10, "percentage": 15},
            {"name": "Homework 1", "value": 6, "percentage": 10},
            {"name": "Quiz 2", "value": 9, "percentage": 15}
        ]
    },
    {
        "name": "علي حسن",
        "absence_hours": 4,
        "exams": [
            {"name": "Mid 1", "value": 30, "percentage": 30},
            {"name": "Mid 2", "value": 28, "percentage": 30},
            {"name": "Quiz 1", "value": 10, "percentage": 15},
            {"name": "Homework 1", "value": 7, "percentage": 10},
            {"name": "Quiz 2", "value": 13, "percentage": 15}
        ]
    },
    {
        "name": "ندى محمود",
        "absence_hours": 3,
        "exams": [
            {"name": "Mid 1", "value": 21, "percentage": 30},
            {"name": "Mid 2", "value": 22, "percentage": 30},
            {"name": "Quiz 1", "value": 11, "percentage": 15},
            {"name": "Homework 1", "value": 9, "percentage": 10},
            {"name": "Quiz 2", "value": 12, "percentage": 15}
        ]
    },
    {
        "name": "محمد عبد الله",
        "absence_hours": 5,
        "exams": [
            {"name": "Mid 1", "value": 19, "percentage": 30},
            {"name": "Mid 2", "value": 21, "percentage": 30},
            {"name": "Quiz 1", "value": 8, "percentage": 15},
            {"name": "Homework 1", "value": 7, "percentage": 10},
            {"name": "Quiz 2", "value": 10, "percentage": 15}
        ]
    }
]


export const GradesScreen = ({className}) => {
    const [t, i18] = useTranslation("global");
    return (
        <div className={`${className} w-full bg-background p-6`}>
            <DetailedActionCard title={t("publish_grades")}
                                description={t("click_to_publish_exam_grades_for_all_students_you_can_review_and_edit_grades_before_final_publication")}
                                buttonTitle={t("publish_grades")}
            />
            <div className="mt-6">
                <h1 className="text-[24px] font-medium text-onBackground">{t("current_grades")}</h1>
                <p className="text-onBackgroundCaption mt-2">{t("this_table_shows_the_current_grades_for_all_students_you_can_modify_the_grades_or_add_new_ones_for_each_exam")}</p>
            </div>
            <div className="flex flex-wrap gap-2 xl:mt-6 mt-4">
                <Chip text={t("none_carried_students")} count={36} isActive={true}/>
                <Chip text={t("carried_students")} count={4} isActive={false}/>
            </div>
            <div className="flex flex-wrap gap-2 xl:mt-8 mt-6">
                <DropDown
                    currentValue={t("homework_and_exams")}
                    items={[t("homework_and_exams"), t("homework"), t("exams")].map((item) => (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))}
                />

                <DropDown
                    currentValue={t("freshman")}
                    items={[t("freshman"), t("sophomore"), t("junior"), t("senior")].map((item) => (
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
            <div className="mt-4 border border-onBackgroundCaption rounded-t-lg">
                <h1 className="text-onBackground bg-card h-12 ps-4 flex items-center visible sm:hidden rounded-t-lg">{t("current_grades")}</h1>
                <TableReact className="rounded-t-lg"/>
            </div>
            <div className='w-full h-4 bg-background'/>
        </div>
    )
}



export const Chip = ({className, text, count, isActive}) => {
    let chipColor = isActive ? "bg-primary text-onPrimary" : "bg-card text-onBackground"
    return (
        <div
            className={`${className} ${chipColor} px-4 py-2 flex flex-row align-middle rounded-full w-fit cursor-pointer`}>
            <p className="text-[16px]">{text}</p>
            <svg className={`mx-2 mt-[4px] ${chipColor}`} xmlns="http://www.w3.org/2000/svg" width="2" height="19"
                 viewBox="0 0 2 20"
                 fill="none">
                <path
                    d="M1.54956 0.5C1.54956 0.223858 1.3257 0 1.04956 0C0.773418 0 0.549561 0.223858 0.549561 0.5H1.54956ZM0.549561 0.5V19.5H1.54956V0.5H0.549561Z"
                    fill="currentColor" fillOpacity="0.86"/>
            </svg>
            <p className="text-[16px]">{count}</p>
        </div>
    )
}


export const TableReact = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const divRef = useRef(null);

    const updateWidth = useCallback(() => {
        if (divRef.current) {
            setScreenWidth(divRef.current.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [updateWidth]);

    let isWrapped = screenWidth >= 7 * 84
    const borderForBodies = `border-0 ${isWrapped ? 'border-b border-card' : ''}`;
    const lastBody = `${isWrapped ? 'border-0' : 'border-b border-card'}`;
    const thBg = `${isWrapped ? 'bg-card' : 'bg-none'}`;

    return (
        <table
            className={`w-full flex flex-row bg-background overflow-hidden text-onBackground rounded-t-lg ${
                isWrapped ? 'inline-table' : ''
            } ${isWrapped ? 'text-center' : 'text-start'}`}
            ref={divRef}>
            <thead>
            {products?.map((data, index) => (
                <tr
                    className={`flex flex-col ${isWrapped ? 'table-row mb-0' : ''} ${index === 0 ? (isWrapped ? 'flex' : '') : (isWrapped ? 'hidden' : '')} ${thBg}`}
                    key={index}
                >
                    <th className={`py-3 px-4 rounded-none ${isWrapped ? 'text-center' : 'text-start'}`}>
                        Name
                    </th>
                    <th className={`py-3 px-4 ${isWrapped ? 'text-center' : 'text-start'}`}>
                        Absence Hours
                    </th>
                    {data.exams.map((exam, examIndex) => (
                        <th key={examIndex}
                            className={`py-3 px-4 ${isWrapped ? 'text-center' : 'text-start'} ${examIndex === data.exams.length - 1 ? lastBody : ''}`}>
                            {exam.name}
                            <span className="text-xs text-onBackgroundCaption"> ({exam.percentage}%)</span>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody className={`flex-1 ${isWrapped ? 'flex-none' : ''}`}>
            {products?.map((data, index) => (
                <tr
                    className={`flex flex-col ${isWrapped ? 'table-row mb-0' : ''}`}
                    key={index}
                >
                    <td className={`${borderForBodies} py-3 px-4`}>
                        {data?.name}
                    </td>
                    <td className={`${borderForBodies} py-3 px-4`}>
                        {data?.absence_hours}
                    </td>
                    {data.exams.map((exam, examIndex) => (
                        <td key={examIndex}
                            className={`${examIndex === data.exams.length - 1 ? 'border-b border-card' : borderForBodies} py-3 px-4`}>
                            {exam.value}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

//https://saif-alhaider.github.io/nahrain-central/
//https://saif-alhaider.github.io/nahrain-central
import {ReactComponent as IcUsers} from 'presentation/Common/resources/images/ic_users.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

const products = [
    {
        "name": "أحمد علي",
        "date_created": "Feb 22,2025",
        "email": "ahmed.kareem@nahrainuniv.edu.iq"

    },
    {
        "name": "فاطمة الزهراء",
        "date_created": "Mar 01,2025",
        "email": "sara.tamimi@nahrainuniv.edu.iq"
    },
    {
        "name": "محمود سعيد",
        "date_created": "Mar 12,2025",
        "email": "mustafa.jassim@nahrainuniv.edu.iq"
    },
    {
        "name": "سارة محمد",
        "date_created": "Mar 22,2025",
        "email": "layla.hussein@nahrainuniv.edu.iq"
    },
    {
        "name": "يوسف إبراهيم",
        "date_created": "Apr 01,2025",
        "email": "omar.mahmoud@nahrainuniv.edu.iq"
    },
    {
        "name": "علي حسن",
        "date_created": "Apr 02,2025",
        "email": "hanaa.saleh@nahrainuniv.edu.iq"
    },
]
export const Users = () => {
    const [t, i18] = useTranslation("global");

    return (
        <div className={`bg-background p-6 h-fit flex-1`}>
            <div className={`flex flex-wrap justify-between gap-x-8 gap-y-4`}>
                <div className={`flex flex-row gap-2`}>
                    <IcUsers className={`w-6 h-6 min-w-6 min-h-6 flex-none text-onBackground`}/>
                    <div className={`flex flex-col gap-2`}>
                        <h1 className={`text-2xl text-onBackground font-semibold`}>{t("users_management")}</h1>
                        <p className={`text-[16px] text-onBackgroundCaption`}>{t('users_screen_description')}</p>
                    </div>
                </div>
                <button
                    className={`flex-1 justify-center text-onBackground text-nowrap border rounded-lg border-softGray py-3 px-6 text-lg flex flex-row gap-2 items-center`}>
                    <span>{t('add_new_user')}</span>
                    <IcAddCircle/>
                </button>
            </div>
            <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>
            <div className={`flex flex-wrap justify-between gap-4`}>
                <div className={`md:flex-1 min-w-[340px]`}>
                    <h1 className={`text-xl text-onBackground font-medium`}>{t("professors")}</h1>
                    <p className={`text-[16px] text-onBackgroundCaption mt-2`}>{t("professors_description")}</p>
                </div>
                <div className={`flex flex-col ltr:items-end rtl:items-start gap-3 flex-1`}>
                    <div className="mt-4  border border-onBackgroundCaption rounded-t-lg w-full">
                        <h1 className="text-onBackground bg-card h-12 ps-4 flex items-center visible sm:hidden rounded-t-lg">{t("professors")}</h1>
                        <UsersTable className="rounded-t-lg"/>
                    </div>
                    <div className={`flex flex-row gap-2 text-onBackground`}>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            1
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            2
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            ...
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            4
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            5
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>
            <div className={`flex flex-wrap justify-between gap-4`}>
                <div className={`md:flex-1 min-w-[340px]`}>
                    <h1 className={`text-xl text-onBackground font-medium`}>{t("students")}</h1>
                    <p className={`text-[16px] text-onBackgroundCaption mt-2`}>{t("students_description")}</p>
                </div>
                <div className={`flex flex-col ltr:items-end rtl:items-start gap-3 flex-1`}>
                    <div className="mt-4  border border-onBackgroundCaption rounded-t-lg w-full">
                        <h1 className="text-onBackground bg-card h-12 ps-4 flex items-center visible sm:hidden rounded-t-lg">{t("students")}</h1>
                        <UsersTable className="rounded-t-lg"/>
                    </div>
                    <div className={`flex flex-row gap-2 text-onBackground`}>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            1
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            2
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            ...
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            4
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const UsersTable = ({className}) => {
    const [t, i18] = useTranslation("global");

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const divRef = useRef(null);

    const updateWidth = useCallback(() => {
        setScreenWidth(window.innerWidth)
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [updateWidth]);

    let isWrapped = screenWidth > 640 // 640 as in sm in tailwind
    const borderForBodies = `border-0 ${isWrapped ? 'border-b border-card' : ''}`;
    const thBg = `${isWrapped ? 'bg-card' : 'bg-none'}`;

    return (
        <table
            className={`${className} w-full flex flex-row bg-background overflow-hidden text-onBackground rounded-t-lg ${
                isWrapped ? 'inline-table' : ''
            } ${isWrapped ? 'text-center' : 'text-start'}`}
            ref={divRef}>
            <thead>
            {products?.map((data, index) => (
                <tr
                    className={`flex flex-col ${isWrapped ? 'table-row mb-0' : ''} ${index === 0 ? (isWrapped ? 'flex' : '') : (isWrapped ? 'hidden' : '')} ${thBg}`}
                    key={index}
                >
                    <th className={`py-3 px-4 rounded-none ${isWrapped ? 'text-center' : 'text-start'} text-nowrap`}>
                        {t("name")}
                    </th>
                    <th className={`py-3 px-4 ${isWrapped ? 'text-center' : 'text-start'} text-nowrap`}>
                        {t("date_created")}
                    </th>
                    <th className={`py-3 px-4 ${isWrapped ? 'text-center' : 'text-start border-b border-card'} text-nowrap`}>
                        {t("email")}
                    </th>
                </tr>
            ))}
            </thead>
            <tbody className={`flex-1 ${isWrapped ? 'flex-none' : ''}`}>
            {products?.map((data, index) => (
                <tr
                    className={`flex flex-col ${isWrapped ? 'table-row mb-0' : ''}`}
                    key={index}
                >
                    <td className={`${borderForBodies} py-3 px-4 text-nowrap`}>
                        {data?.name}
                    </td>
                    <td className={`${borderForBodies} py-3 px-4 text-nowrap`}>
                        {data?.date_created}
                    </td>
                    <td className={`border-b border-card py-3 px-4 text-nowrap`}>
                        {data?.email}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
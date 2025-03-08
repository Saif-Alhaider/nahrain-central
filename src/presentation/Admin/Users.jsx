import {ReactComponent as IcUsers} from 'presentation/Common/resources/images/ic_users.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import React from "react";


export const Users = () => {
    return (
        <div className={`bg-background p-6 h-fit `}>
            <div className={`flex flex-wrap justify-between gap-x-8 gap-y-4`}>
                <div className={`flex flex-row gap-2`}>
                    <IcUsers className={`w-6 h-6 min-w-6 min-h-6 flex-none text-onBackground`}/>
                    <div className={`flex flex-col gap-2`}>
                        <h1 className={`text-2xl text-onBackground font-semibold`}>User Management</h1>
                        <p className={`text-[16px] text-onBackgroundCaption`}>View and manage all professors and
                            students. Add new users, update their details, and ensure accurate records.</p>
                    </div>
                </div>
                <button
                    className={`flex-1 justify-center text-onBackground text-nowrap border rounded-lg border-softGray py-3 px-6 text-lg flex flex-row gap-2 items-center`}>
                    <span>Add New User</span>
                    <IcAddCircle/>
                </button>
            </div>
            <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>

        </div>
    )
}

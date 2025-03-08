import {ReactComponent as IcUsers} from 'presentation/Common/resources/images/ic_users.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'


export const Users = () => {
    return (
        <div className={`bg-background p-6 h-fit`}>
            <div className={`flex flex-row justify-between`}>
                <div className={`flex flex-row gap-2`}>
                    <IcUsers className={`text-onBackground`}/>
                    <div className={`flex flex-col gap-2`}>
                        <h1 className={`text-2xl text-onBackground font-semibold`}>User Management</h1>
                        <p className={`text-[16px] text-onBackgroundCaption`}>View and manage all professors and
                            students. Add new users, update their details, and ensure accurate records.</p>
                    </div>
                </div>
                <button className={`text-onBackground border rounded-lg border-softGray py-3 px-6 text-lg flex flex-row gap-2 items-center`}>
                    <span>Add New User</span>
                    <IcAddCircle/>
                </button>
            </div>
        </div>
    )
}

import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

export const HomeScreen = () => {
    return (
        <div className={`size-full bg-background p-6`}>
            <div className={`flex flex-col gap-2`}>
                <h1 className={`font-semibold text-[32px] text-onBackground`}>Home Dashboard</h1>
                <p className={` text-[20px] text-onBackgroundCaption`}> Manage users, schedules, absences, and grades in
                    one place.</p>
            </div>
            <div className="grid md:!flex md:flex-wrap mt-12 grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-2 ">
                <ExamCard className="max-w-[277px] cursor-pointer"/>
                <ViewAllCard className="max-w-[277px] grow cursor-pointer" title="Total Students" number="1,245"/>
                <ViewAllCard className="max-w-[277px] grow cursor-pointer" title="Total Professors" number="58"/>
            </div>
        </div>
    )
}


const ExamCard = ({className}) => {
    return (
        <div className={`${className} rounded-2xl bg-secondary p-4`}>
            <h2 className="hidden md:!block text-lg font-semibold text-onPrimary">Upcoming Exams Final</h2>
            <h2 className="block md:!hidden text-4xl font-semibold text-onPrimary">Finals</h2>
            <p className="mt-2 md:!text-md text-2xl text-onBackground dark">Dec 20, 2024</p>
            <p className="mt-4 hidden md:!block text-sm text-onPrimary">
                Ensure all schedules and materials are uploaded in advance.
            </p>
        </div>
    );
};


const ViewAllCard = ({className,title,number}) => {
    return (
        <div
            className={`${className} max-w-[277px] rounded-2xl border border-softGray p-4 flex flex-col justify-between`}>
            <div className="flex-grow">
                <p className="text-onBackground text-xl">{title}</p>
            </div>
            <div>
                <h1 className={`text-5xl font-semibold text-onBackground mx-auto mt-2 text-center`}>{number}</h1>
            </div>
            <div className="hidden md:!block text-secondary text-sm font-semibold mt-4 cursor-pointer">
                View All
            </div>
        </div>
    );
};
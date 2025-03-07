import {HomeScreen} from "../presentation/Prof/Home/HomeScreen";
import {ProfRecordedLectures} from "../presentation/Prof/ProfRecordedLectures/ProfRecordedLectures";
import {GradesScreen} from "../presentation/Prof/Grades/GradesScreen";
import {MainRecordAbsence} from "../presentation/Prof/Record Absence/MainRecordAbsence";
import {ExamsScreen} from "../presentation/Prof/Exams/ExamsScreen";
import {SettingsScreen} from "../presentation/Common/screens/Settings/SettingsScreen";
import {AnnouncementScreen} from "../presentation/Common/screens/Announcement/AnnouncementScreen";
import {RecordAbsence} from "../presentation/Prof/Record Absence/RecordAbsence";
import {StudentRecordedLectures} from "../presentation/Student/StudentRecordedLectures/StudentRecordedLectures";

export const routesByRole = {
    ADMIN: [
        {path: '', element: <HomeScreen/>},
        {path: 'settings', element: <SettingsScreen/>},
        {path: 'announcement', element: <AnnouncementScreen/>},
    ],
    PROF: [
        {path: '', element: <HomeScreen/>},
        {path: 'recorded-lectures', element: <ProfRecordedLectures/>},
        {path: 'grades', element: <GradesScreen/>},
        {path: 'record-absence', element: <MainRecordAbsence/>},
        {path: 'lectures-schedule', element: <div></div>},
        {path: 'exams', element: <ExamsScreen/>},
        {path: 'settings', element: <SettingsScreen/>},
        {path: 'announcement', element: <AnnouncementScreen/>},
        {path: 'take-absence', element: <RecordAbsence/>},
    ],
    STUDENT: [
        {path: '', element: <HomeScreen/>},
        {path: 'recorded-lectures', element: <StudentRecordedLectures/>},
        {path: 'grades', element: <GradesScreen/>},
        {path: 'exams', element: <ExamsScreen/>},
        {path: 'settings', element: <SettingsScreen/>},
    ],
};

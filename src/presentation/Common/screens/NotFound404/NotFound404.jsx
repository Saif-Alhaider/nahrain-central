import 'output.css'
import 'index.css'
import notFoundImg from 'presentation/Common/screens/NotFound404/resources/notFound.png'
import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const NotFound404 = () => {
    const [t, i18] = useTranslation("global");
    return (
        <div className={"h-dvh w-full overflow-hidden bg-background"}>
            <div className={"flex flex-col w-full items-center px-4"}>
                <h1 className={'text-[120px] text-onBackground font-semibold'}>4<span className={'text-primary'}>0</span>4</h1>
                <p className={"text-onBackgroundCaption lg:text-[24px] text-[14px] max-w-[757px] text-center mt-1"}>{t("oops_the_page_youre_looking_for_doesnt_exist_it_might_have_been_removed_had_its_name_changed_or_is_temporarily_unavailable_please_check_the_url_or_go_back_to_the_homepage")}</p>
                <Link to='/nahrain-central' className={"text-secondary mt-6 lg:text-[24px] text-[16px] font-medium cursor-pointer"}>{t("go_back_home")}</Link>
            </div>
            <div className={"min-w-[1000px] max-w-full h-[591px]"}>
                <img src={notFoundImg} alt="auth"  className={` mx-auto authentication-image object-cover object-left`}/>
            </div>
        </div>
    )
}

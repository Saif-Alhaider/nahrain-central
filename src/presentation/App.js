import 'output.css';
import LoginImage from "presentation/Login/resources/Design.png"
import React from "react";
import Logo from "presentation/component/Logo"

function App() {
    return (
        <div className="min-h-svh flex flex-row dark">

            <div className="h-[inherit] flex flex-col  w-full xl:w-1/2 bg-card xl:px-14 px-6 windows:py-12 py-6">
                <Logo className="xl:mx-0 mx-auto" width={158} height={46}/>

                <LoginForm className="flex-grow content-center mt-6 w-full max-w-[536px] m-auto"/>
            </div>

            <div className="h-[inherit] w-1/2 bg-background px-[56px] py-[48px] content-center xl:block overflow-hidden hidden">
                <p className="text-onBackground">Nahrain Central is an academic platform for professors and students to manage grades, schedules, and
                    attendance. It centralizes academic tasks in one place to streamline the educational process.</p>
                <img src={LoginImage} alt="login image" className="mt-8 w-full mx-auto authentication-image scale-125"/>
            </div>
        </div>
    );
}

export default App;


export const LoginForm = ({className}) => {
    return (
        <form className={className}>
            <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">Login</h1>
            <input placeholder="John@nahrainuniv.edu.iq"
                   className="mt-[48px] max-w-full w-full p-[16px] rounded-[8px] bg-transparent border border-strokeGrey focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                   type="email"/>

            <div className="relative mt-[16px]">
                <input placeholder="Enter Password"
                       className=" max-w-full w-full p-[16px] rounded-[8px] bg-transparent border border-strokeGrey focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                       type="password"/>
                <svg className="absolute top-[16px] right-[16px]" width="24" height="24" viewBox="0 0 24 24"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                          className="fill-strokeGrey"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z"
                          className="fill-strokeGrey"/>
                </svg>
            </div>
            <p className="underline text-[16px] mt-[16px] text-onBackground">Forgot Password ?</p>
            <button className="bg-primary w-full max-w-full text-white h-14 rounded-lg text-[24px] mt-6">Login
            </button>
            <div className="flex items-center space-x-4 mt-6 w-full max-w-full">
                <hr className="flex-1 border border-strokeGrey"/>
                <div className="w-fit text-[16px] text-onBackgroundCaption">or Login With</div>
                <hr className="flex-1 border border-strokeGrey"/>
            </div>
            <button
                className="mt-6 flex items-center gap-3 rounded-lg bg-background w-full justify-center h-14 max-w-full">
                {/*google logo*/}
                <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M33.0001 17.382C33.0001 16.2351 32.9063 15.0925 32.7102 13.9617H16.8324V20.4388H25.9254C25.5495 22.5285 24.3362 24.3771 22.5636 25.5485V29.7564H27.9921C31.1702 26.8341 33.0001 22.5039 33.0001 17.382Z"
                        fill="#4285F4"/>
                    <path
                        d="M16.8323 33.8214C21.3749 33.8214 25.2023 32.3317 27.9921 29.7604L22.5635 25.5525C21.0521 26.577 19.1077 27.1606 16.8323 27.1606C12.4413 27.1606 8.71582 24.2019 7.38016 20.2184H1.79224V24.5526C4.65148 30.238 10.4683 33.8214 16.8323 33.8214Z"
                        fill="#34A853"/>
                    <path
                        d="M7.38425 20.2182C6.6777 18.1328 6.6777 15.8676 7.38425 13.7782V9.44794H1.79236C-0.597455 14.2024 -0.597455 19.8019 1.79236 24.5567L7.38425 20.2182Z"
                        fill="#FBBC04"/>
                    <path
                        d="M16.8323 6.84011C19.2343 6.80337 21.5504 7.70549 23.2904 9.36248L28.0983 4.56277C25.0512 1.70607 21.0154 0.134713 16.8323 0.179649C10.4683 0.179649 4.64753 3.76692 1.79224 9.44811L7.38412 13.7823C8.71582 9.79489 12.4413 6.84011 16.8323 6.84011Z"
                        fill="#EA4335"/>
                </svg>
                <p className="text-logo text-2xl">Google</p>
            </button>
            <p className="mt-6 text-onBackground">Don’t have an Account? <span className="text-secondary underline">Signup</span>
            </p>
        </form>
    )
}


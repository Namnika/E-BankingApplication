import { useLocation } from "react-router-dom"


const Layout = ({ children }) => {
    const pathName = useLocation();

    const isAuthPage = pathName === "/login" || pathName === "/register";

    return (
        <div className={isAuthPage ? "" : "main-content"}>{children}</div>
    )
}

export default Layout
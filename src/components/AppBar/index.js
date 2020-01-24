import React, {useContext} from "react"
import {GlobalContext} from "../../GlobalContext";
import MobileAppBar from "./MobileAppBar";
import DesktopAppBar from "./DesktopAppBar";

export default (props) => {
    const ctx = useContext(GlobalContext);
    return ctx.state.isMobile ? <MobileAppBar/> : <DesktopAppBar position={"fixed"}/>
}
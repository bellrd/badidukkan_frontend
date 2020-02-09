import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {GlobalContextProvider} from "./GlobalContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/core/styles"
import theme from "./theme"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LogoutPage from "./pages/LogoutPage";
import VerifyPage from "./pages/VerifyPage";
import SnackbarProvider from "./components/SnackbarProvider";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/OrderPage";
import AddressPage from "./pages/AddressPage";
import EditAddressPage from "./pages/EditAddressPage";
import OrderTypePage from "./pages/OrderTypePage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import PayOnlinePage from "./pages/PayOnlinePage";
import SuccessPage from "./pages/SuccessPage";
import FailedPage from "./pages/FailedPage";
import NotFoundPage from "./pages/404Page"


const App = (props) => {
    return (
        <GlobalContextProvider>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <Router>
                        <div>
                            <Switch>
                                <Route path="/" exact component={HomePage}/>
                                <Route path="/login" exact component={LoginPage}/>
                                <Route path="/register" exact component={RegisterPage}/>
                                <Route path="/logout" exact component={LogoutPage}/>
                                <Route path="/forgotPassword" exact component={ForgotPasswordPage}/>
                                <Route path="/verify" exact component={VerifyPage}/>
                                <Route path="/cart" exact component={CartPage}/>
                                <Route path="/profile" exact component={ProfilePage}/>
                                <Route path="/orderHistory" exact component={OrderPage}/>
                                <Route path="/menu/:merchandise_id" exact component={MenuPage}/>
                                <Route path="/chooseAddress" exact component={AddressPage}/>
                                <Route path="/editAddress" exact component={EditAddressPage} />
                                <Route path="/selectOrderType" exact component={OrderTypePage} />
                                <Route path="/checkout" exact component={OrderSummaryPage} />
                                <Route path="/payOnline" exact component={PayOnlinePage} />
                                <Route path={"/success/:action?"} component={SuccessPage} />
                                <Route path={"/failed/:message?"} component={FailedPage} />
                                <Route component={NotFoundPage}/>
                            </Switch>
                        </div>
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        </GlobalContextProvider>
    )
};

export default App;

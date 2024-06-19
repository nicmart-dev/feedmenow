import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LanguageProvider from './i18n/LanguageProvider' // Package used to manage translations
import Footer from './components/Footer.jsx'

const App = () => {
    /* TODO example state stored
    const [userDetails, setUserDetails] = useState(null)  */


    return (
        /* Wraps the application to provide the OAuth context */
            <LanguageProvider>
                <BrowserRouter>
                    {/*TODO navigation bar <Navbar /> */}
                    <Routes>
                        {/* TODO: example private route: Ask user to log in when landing on site, then if role
                        is PM go to Dashboard, otherwise to Settings page */}
                        {/* <Route
                            path="/"
                            element={
                                userDetails ? (
                                    userDetails.Role === 'Project Manager' ? (
                                        <Navigate to="/x" replace />
                                    ) : (
                                        <Navigate to="/y" replace />
                                    )
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        /> */}
                        
                        {/* TODO: example normal route: <Route path="/privacy" element={<PrivacyPolicy />} /> */}
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </LanguageProvider>
    )
}

/* Protects the routes that require authentication. 
TODO: maybe not needed depending on auth requirements */
// const PrivateRoute = ({ element, userDetails }) => {
//     return userDetails ? element : <Navigate to="/login" />
// }

export default App
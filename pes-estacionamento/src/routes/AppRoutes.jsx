import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/login/Login.js';
import { Cadastro } from '../pages/home/Home.js';

import React from 'react';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/cadastro" element={<Cadastro />} />

            </Routes>
        </BrowserRouter>
    );
} 

export default AppRoutes;

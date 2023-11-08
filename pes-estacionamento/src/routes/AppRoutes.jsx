import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/Home.js';
import { Cadastro } from '../pages/cadastro/Cadastro.js';
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

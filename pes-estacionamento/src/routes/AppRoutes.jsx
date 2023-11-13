import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Entrada } from '../pages/Entrada/entrada.js';
import { Cadastro } from '../pages/home/Home.js';

import React from 'react';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Entrada />} />

                <Route path="/cadastro" element={<Cadastro />} />

            </Routes>
        </BrowserRouter>
    );
} 

export default AppRoutes;

import React from 'react'
import { Outlet } from 'react-router-dom'
import FloatingRectangles from '../Containers/FloatingRectangles'

function AuthLayout() {
    return (
        <FloatingRectangles>
            <Outlet />
        </FloatingRectangles>
    )
}

export default AuthLayout
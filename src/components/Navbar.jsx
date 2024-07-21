import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-slate-50">
            <Link to="/" className="text-xl font-bold">
                iNotebook
            </Link>
            <NavigationMenu>
                <NavigationMenuList className="flex space-x-4">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-blue-500' : ''}`}>Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'text-blue-500' : ''}`}>About</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {localStorage.getItem('token') ? (
                        <NavigationMenuItem>
                            <Button variant="destructive" onClick={handleLogout} className="px-4 py-2">Logout</Button>
                        </NavigationMenuItem>
                    ) : (
                        <>
                            <NavigationMenuItem>
                                <Button variant="outline" asChild className="px-4 py-2">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </Button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Button variant="outline" asChild className="px-4 py-2">
                                    <Link to="/signup" className="nav-link">Signup</Link>
                                </Button>
                            </NavigationMenuItem>
                        </>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    );
};

export default Navbar;

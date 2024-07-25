import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { NotebookText } from 'lucide-react';

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="flex items-center justify-between p-4">
            <Link to="/" className="flex items-center text-xl font-bold">
                <NotebookText className="w-8 h-8 mr-2" />
                NotesApp
            </Link>
            <NavigationMenu>
                <NavigationMenuList className="flex items-center space-x-4">
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
                        <Button variant="destructive" onClick={handleLogout} className="px-4 py-2">
                            Logout
                        </Button>
                    ) : (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/login" className="nav-link px-4 py-2 border rounded hover:bg-gray-100">Login</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/signup" className="nav-link px-4 py-2 border rounded hover:bg-gray-100">Signup</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    );
};

export default Navbar;
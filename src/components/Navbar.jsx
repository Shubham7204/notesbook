import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { NotebookText, Menu } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-white">
            <Link to="/" className="flex items-center text-xl font-bold">
                <NotebookText className="w-8 h-8 mr-2" />
                NotesApp
            </Link>
            <div className="md:hidden">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost">
                            <Menu className="w-8 h-8" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                        <NavigationMenu>
                            <NavigationMenuList className="flex flex-col space-y-4">
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-blue-500' : ''}`}>Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'text-blue-500' : ''}`}>All Notes</Link>
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
                                                <Link to="/login" className="nav-link py-2 hover:bg-gray-100">
                                                    <Button>Login</Button>
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild>
                                                <Link to="/signup" className="nav-link py-2 hover:bg-gray-100">
                                                    <Button>Signup</Button>
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </>
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </PopoverContent>
                </Popover>
            </div>
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="flex items-center space-x-4">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-blue-500' : ''}`}>Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'text-blue-500' : ''}`}>All Notes</Link>
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
                                    <Link to="/login" className="nav-link py-2 hover:bg-gray-100">
                                        <Button>Login</Button>
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/signup" className="nav-link py-2 hover:bg-gray-100">
                                        <Button>Signup</Button>
                                    </Link>
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

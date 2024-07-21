import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        } else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <Input
                        type="email"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        className="mt-1 block w-full"
                    />
                    <p id="emailHelp" className="mt-2 text-sm text-gray-500">We'll never share your email with anyone else.</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <Input
                        type="password"
                        value={credentials.password}
                        onChange={onChange}
                        id="password"
                        name="password"
                        className="mt-1 block w-full"
                    />
                </div>
                <Button type="submit" className="w-full py-2 mt-4">Submit</Button>
            </form>
        </div>
    );
}

export default Login;

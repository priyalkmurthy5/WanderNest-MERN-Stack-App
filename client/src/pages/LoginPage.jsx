import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { setUser } = useContext(UserContext);
    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data);
            alert('Login sucessful!')
            setRedirect(true)
        } catch (err) {
            console.log(err)
            alert('Login failed. Please try again later')
        }
    }

    if (redirect) {
        return <Navigate to={'/account'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button className="primary">Login</button>
                    <div className="text-center py2 text-gray-500">
                        {"Don't have an account yet? "}
                        <Link className="underline text-black" to={"/register"}>Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
import Login from "./login";
import Register from "./signup";

function LoginSignup() {
    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <Login />
            <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
            <Register />
        </div>
        </div>
    );
    }
export default LoginSignup;
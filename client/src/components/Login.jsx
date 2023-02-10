import React, {useState} from 'react';

const Login = () => {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    })

    function handleChange(e){
        setUserInfo(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    function handleLogin(e){
        if(!userInfo.email || !userInfo.password){
            return;
        }


    }

    return (
        <div>
            <form className="max-w-sm mx-auto bg-dark-20 shadow-xl p-4 rounded mt-10" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="" className="font-medium text-sm my-2">Email</label>
                    <input
                        onChange={handleChange}
                        className="input"
                        name="email"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="" className="font-medium text-sm my-2">Passord</label>
                    <input
                        onChange={handleChange}
                        className="input"
                        name="password"
                    />
                </div>

                <button type="submit" className="btn mt-2">Login</button>
            </form>
        </div>
    );
};

export default Login;
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("") 
    const navigate = useNavigate()

    const sendData = (event) => {
        event.preventDefault()

        const data = { email, password }

        fetch("https://vica.website/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.token) {
                localStorage.setItem("token", "Bearer " + res.token)
                navigate("/dashboard")
            } else {
                setError("Incorrect email or password") 
            }
        })
        .catch(err =>{ console.log(err)
        setError("Something went wrong. Please try again later.")
    })

    }

    return (
        <div className="auth">
            <div className="auth-form">
                <div className="form-title">
                    <h3>Sign In</h3>
                    <p>Please enter your email and password to continue</p>
                </div>
                <form onSubmit={sendData} className="login-form">
                {error && <p className="error-text">{error}</p>}
                    <div className="form-inputs">
                        <div className="input-container">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="*******"
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button type="submit" className="submit-btn">Sign In</button>
                        <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn

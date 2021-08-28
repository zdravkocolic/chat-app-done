import React from "react";


const Login = (props) => {

    const {email, setEmail, username, setUsername, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError, logWithGoogle, logWithGit} = props;

    return (
        

        <section className="login">
            <div className="loginContainer">
                <label>Email</label>
                <input type="text" autoFocus required value={email} onChange = {e => setEmail(e.target.value)} />
                <label>Username</label>
                <input type="text" autoFocus required value={username} onChange = {e => setUsername(e.target.value)} />
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>

                <input type="password" required value={password}
                onChange={(e)=> setPassword(e.target.value)} />

                <p className="errorMsg">{passwordError}</p>

                <div className="btnContainer">
                    {hasAccount ? (
                    <> 

                    <button onClick={handleLogin}>Sign in</button>
                    <button  onClick={logWithGit}>Sign in with Github</button>
                    <button onClick={logWithGoogle}>Sign in with Google</button>
                    <p>Don't have an account <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>

                    </>) : (
                    <> 

                        <button onClick={handleSignup}>Sign up</button>
                        <p>Have an account? <br></br> Or try with Google and Github <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        

                    </>)}
                </div>
            </div>

        </section>
    )
}
export default Login;
import React from 'react'
import ReactDOM from 'react-dom'

const loginModal = function(){
    return
    (
    <div class="login-canvas">
        <div class="login-modal">
            <div class="login-form">
                <form style="margin: 20px;">
                    <h1 style="margin-bottom: 20px">Sign In</h1>
                    <label for="username" class="label-title">Username</label>
                    <input id="username" class="form-control" autocomplete="off" placeholder="Username" style="display: block; margin-bottom: 10px;" data-role="none"/>
                    <label for="password" class="label-title">Password</label>
                    <input id="password" type="password" class="form-control" autocomplete="off" placeholder="Password" style="display: block; margin-bottom: 10px;" data-role="none"/>
                    <div style="text-align: left;">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="alwaysSignedIn" data-role="none"/>
                            <label class="form-check-label" for="alwaysSignedIn">Keep me signed in</label>
                        </div>
                        <button id="btnSignIn" class="btn btn-success btn-signin">Sign In</button>
                        <a href="#" class="btn-link btn-guest">Continue as Guest</a>
                        <a href="/signup" class="btn-link">Don't have an account? Sign up here</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

ReactDOM.render(<loginModal />, document.getElementById('login-modal'))
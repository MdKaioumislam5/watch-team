import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { useState } from 'react';
import UserContext from '../UserContext';
import { useHistory, useLocation } from 'react-router';

const Profile = () => {
    const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        phone: '',
        errors: '',
        success: false
    });


    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 5;
            const passwordHasNumber = /\d+/g.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            // [...cart, newItem]
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    console.log('sign in user info', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
            if (!newUser && user.email && user.password) {
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        const newUserInfo = { ...user };
                        newUserInfo.error = '';
                        newUserInfo.success = true;
                        setUser(newUserInfo);

                    })
                    .catch((error) => {
                        const newUserInfo = { ...user };
                        newUserInfo.error = error.message;
                        newUserInfo.success = false;
                        setUser(newUserInfo);
                    });

            }
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: "Jane Q. User",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
            console.log('user name updated successfully')
        }).catch(function (error) {
            console.log('error');
        });
    }




    //google & facebook
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    //google & facebook end

    //google & facebook areas
    var provider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signInUser = { name: displayName, email };
                setUserLoggedIn(signInUser);
                history.replace(from)
                setUser(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage);
            });

    }
    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signInUser = { name: displayName, email };
                setUserLoggedIn(signInUser);
                history.replace(from)
                setUser(user);

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email);
                //facebook & google end
            });
    }
    return (
        <section>
            <div>
                <h1>Create New Account</h1>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Sign up</label>
                <form onSubmit={handleSubmit}>
                    {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" />}
                    <br />
                    <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
                    <br />
                    <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                    <br />
                    <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />

                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'create' : 'Logged In'} Successfully</p>}
            </div>


            <div>
                <button onClick={handleGoogleSignIn}>Sign In using Google </button>
                <br />
                <button onClick={handleFacebookSignIn}>Sign In using Facebook </button>
            </div>

        </section>
    );
};

export default Profile;
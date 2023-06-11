import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Linear } from 'gsap/gsap-core';

const ErrorPage = () => {
    useEffect(() => {
        let t1 = gsap.timeline();
        let t2 = gsap.timeline();

        t1.to('.cog1', {
            transformOrigin: '50% 50%',
            rotation: '+=360',
            repeat: -1,
            ease: Linear.easeNone,
            duration: 8,
        });

        t2.to('.cog2', {
            transformOrigin: '50% 50%',
            rotation: '-=360',
            repeat: -1,
            ease: Linear.easeNone,
            duration: 8,
        });
    }, []);
    return (
        <div className="container">
            <h1 className="first-four black">4</h1>
            <div className="cog-wheel1">
                <div className="cog1">
                    <div className="top" />
                    <div className="down" />
                    <div className="left-top" />
                    <div className="left-down" />
                    <div className="right-top" />
                    <div className="right-down" />
                    <div className="left" />
                    <div className="right" />
                </div>
            </div>

            <div className="cog-wheel2">
                <div className="cog2">
                    <div className="top" />
                    <div className="down" />
                    <div className="left-top" />
                    <div className="left-down" />
                    <div className="right-top" />
                    <div className="right-down" />
                    <div className="left" />
                    <div className="right" />
                </div>
            </div>
            <h1 className="second-four black">4</h1>
            <p className="wrong-para">Uh Oh! Page not found!</p>
        </div>
    );
};
export default ErrorPage;
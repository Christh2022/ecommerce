import { useEffect, useState } from "react";
import classes from "./css/clock.module.css";

const Clock = () => {
    const [days, setDays] = useState(null);
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    let interval;

    const countDown = () => {
        const destination = new Date("Oct 13, 2023");

        interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = destination - now;
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (destination < 0) clearInterval(interval.current);
            else {
                setDays(days);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        });
    };

    useEffect(()=>{
        countDown()
    })

    return (
        <div className={classes.clock_wrapper}>
            <div className={classes.clock_data}>
                <div className={classes.clock_text}>
                    <h1>{days}</h1>
                    <h5>Jours</h5>
                </div>
                <span>:</span>
            </div>
            <div className={classes.clock_data}>
                <div className={classes.clock_text}>
                    <h1>{hours}</h1>
                    <h5>Heures</h5>
                </div>
                <span>:</span>
            </div>
            <div className={classes.clock_data}>
                <div className={classes.clock_text}>
                    <h1>{minutes}</h1>
                    <h5>Minutes</h5>
                </div>
                <span>:</span>
            </div>
            <div className={classes.clock_data}>
                <div className={classes.clock_text}>
                    <h1>{seconds}</h1>
                    <h5>Secondes</h5>
                </div>
            </div>
        </div>
    );
};

export default Clock;

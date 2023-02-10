import React, {useEffect, useRef, useState} from "react";

function ActiveTimer(props) {

    const timerId = useRef()

    let [date, setDate] = useState({value: 0, label: ""})

    function renderActiveTime(lastActive) {
        let mili = new Date() - new Date(lastActive)
        let out = {value: mili, label: "mili"}
        if (mili > 1000) {
            let second = mili / 1000
            if (second < 60) {
                out = {value: second, label: "second"}
            } else {
                let minutes = second / 60
                if (minutes < 60) {
                    out = {value: minutes, label: "min"}
                } else {
                    let hour = minutes / 60
                    if (hour < 24) {
                        out = {value: hour, label: "hour"}
                    } else {
                        let day = hour / 24
                        if (day < 7) {
                            out = {value: day, label: "day"}
                        } else {
                            if (day < 30) {
                                let week = day / 30
                                out = {value: week, label: "week"}
                            } else {
                                out = {value: day / 30, label: "month"}
                            }
                        }
                    }
                }
            }
        }

        return out
    }

    useEffect(() => {
        if(props.isOnline) return

        timerId.current = setInterval(() => {
            let s = renderActiveTime(props.oldDate)
            if(s.label === "hour"){
                clearInterval(timerId.current)
            }
            setDate(s)
        }, 1000)

        return () => timerId.current && clearInterval(timerId.current)
    }, [props.oldDate, props.isOnline])

    return (
        <div>
            { props.isOnline ? (
                <h4>Online</h4>
                ) :
                date.value > 0 ? <div>
                    Active {Math.round(date.value) +  " "+ date.label} ago
                </div> : null
            }
        </div>
    )
}

export default ActiveTimer
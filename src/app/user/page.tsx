// pages/user/[userID].js

'use client'
import {useEffect, useState} from "react";

const IframePage = () => {

    const [messageCount, setMessageCount] = useState(0)
    const [questOneDone, setQuestOneDone] = useState(false)
    const [questTwoDone, setQuestTwoDone] = useState(false)
    const [questThreeDone, setQuestThreeDone] = useState(false)


    let index = 0;

    const handleReceiveMessage = (event: MessageEvent) => {
        // event.data contains the received message
        const receivedMessage = event.data;
        index += 1;
        setMessageCount(index)
        console.log(receivedMessage)
        // complete quest
        if (receivedMessage === "1") {
            setQuestOneDone(true)
        }
        if (receivedMessage === "2") {
            setQuestTwoDone(true)
        }
        if (receivedMessage === "3") {
            setQuestThreeDone(true)
        }
    }

    useEffect(() => {
        window.addEventListener('message', handleReceiveMessage);
        return () => {
            window.removeEventListener('message', handleReceiveMessage);
        };
    }, []);

    const handleSendParentMessage = () => {
        // Called from the iframe
        const message = JSON.stringify({
            message: 'Hello from iframe',
            date: Date.now(),
        });
        window.parent.postMessage(message, '*');
    }

    const handleSendOpenWindowMessage= () => {
        // Called from the iframe
        const message = JSON.stringify({
            open:true,
            message: 'open RecycleBin',
            date: Date.now(),
        });
        window.parent.postMessage(message, '*');
    }



    return (
        <div style={{padding:"10px"}}>
            <button onClick={handleSendParentMessage}>Send Parent Message</button>
            <button onClick={handleSendOpenWindowMessage}>Open Bin</button>
            <p>Parent Message Count: {messageCount}</p>
            <ol>
                <li style={{
                    textDecoration: questOneDone ? "line-through" : "none"
                }}>Open My Computer</li>
                <li style={{
                    textDecoration: questTwoDone ? "line-through" : "none"
                }}>Maximise My Computer</li>
                <li style={{
                    textDecoration: questThreeDone ? "line-through" : "none"
                }}>Adjust My Computer window size</li>
            </ol>
        </div>
    )
}

export default IframePage
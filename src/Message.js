import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Flag from 'react-flagkit';
import './App.css';

function Message() {
    const rName = useRef();
    const [name, setName] = useState("");
    const [msg, setMsg] = useState(""); 
    const [showBox1, setShowBox1] = useState(false);
    const [apiQuote, setApiQuote] = useState("");

    const hName = (event) => {
        setName(event.target.value);
    };

    const independenceQuotes = [
        "Freedom is never more than one generation away from extinction. It must be fought for, protected, and handed on for them to do the same.",
        "The price of freedom is eternal vigilance.",
        "Liberty, when it begins to take root, is a plant of rapid growth.",
        "The best way to predict your future is to create it.",
        "Independence is happiness.",
        "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
        "The best way to find yourself is to lose yourself in the service of others. – Mahatma Gandhi",
        "Arise, awake, and stop not till the goal is reached. – Swami Vivekananda",
        "At the dawn of history, India started on her unending quest, and trackless centuries are filled with her striving and the grandeur of her successes and her failures. – Jawaharlal Nehru",
        "You can’t cross the sea merely by standing and staring at the water. – Rabindranath Tagore",
        "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action. – Dr. A.P.J. Abdul Kalam",
        "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion. – Sardar Vallabhbhai Patel",
        "Take the stones people throw at you, and use them to build a monument. – Ratan Tata",
        "There are moments in life when you have to make a choice: Do you stand by and watch, or do you act? – Indira Gandhi",
        "The greatest service which can be rendered to any country is to add a useful plant to its culture. – Baba Amte"
    ];
    

    const show = (event) => {
        event.preventDefault();

        if (name === "") {
            alert("You did not enter a name");
            rName.current.focus();
            return;
        }

        setMsg(<span>Happy 78th Independence Day <Flag country="IN" /> {name}!</span>);
        rName.current.focus();
        setShowBox1(true); 
        setName(""); 

        // Pick a random quote from the predefined quotes
        const randomIndex = Math.floor(Math.random() * independenceQuotes.length);
        setApiQuote(independenceQuotes[randomIndex]);
    };

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * independenceQuotes.length);
        setApiQuote(independenceQuotes[randomIndex]);
    };

     // Timer - 3sec
    useEffect(() => {
        const intervalId = setInterval(getRandomQuote, 3000);
        return () => clearInterval(intervalId);
    }, []);

    // Copy to clipboard part
    const linkRef = useRef(null);

    const copyLink = () => {
        if (linkRef.current) {
            navigator.clipboard.writeText(linkRef.current.value)
                .then(() => {
                    toast.success("Copied to Clipboard", {
                        autoClose: 1000,
                        position: "top-center",
                        theme: "dark"
                    });
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    };

    const currentUrl = window.location.href;

    return (
        <center>
            <h1>Welcome</h1>
            <div className="box">
                <form onSubmit={show}>
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        onChange={hName}
                        ref={rName}
                        value={name}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>

            {showBox1 && (
                <div>
                    <h2>{msg}</h2>
                    <p>{apiQuote}</p>
                    <div className="box-1">
                        <h4>Let's Share it with Others</h4>
                        <input
                            type="text"
                            readOnly
                            value={currentUrl}
                            ref={linkRef}
                            style={{ width: '80%', marginBottom: '10px' }}
                        />
                        <br />
                        <button onClick={copyLink} className="btn">
                            Copy
                        </button>
                    </div>
                </div>
            )}
        
            <ToastContainer />
        </center>
    );
}

export default Message;

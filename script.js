let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")


function speak(talk) {        //This creates a function called speak that takes one input (called talk), which is the text you want to read aloud.           
    let text = new SpeechSynthesisUtterance(talk)      //It uses the text you gave (talk) to make the computer voice say it.
    text.rate = 1               //normal speaking speed.
    text.volume = 1             //full volume
    text.pitch = 1              //normal pitch
    text.lang = "en-GB";
    window.speechSynthesis.speak(text)  // This finally tells the computer to speak the text out loud using the settings above.
}

function wish() {
    let day = new Date()
    let hours = day.getHours()
    // console.log(hours)
    if (hours >= 0 && hours < 12) {
        speak("Good Morning")
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon")
    }
    else {
        speak("Good evening")
    }
}
window.addEventListener("load", () => {
    wish()
})
let recognition = window.SpeechRecognition || window.webkitSpeechRecognition
if (recognition) {
    let speech = new recognition()
    speech.lang = "en-GB";
    speech.onresult = (event) => {
        let transcript = event.results[0][0].transcript
        console.log("User said", transcript)
        // content.textContent = transcript;   not render (ui) 
        takeCommand(transcript.toLowerCase())

    }
    btn.addEventListener("click", () => {
        speech.start()
        btn.style.display = "none"         //hide button while listening
        voice.style.display = "block"   //show GIF

    })
    // Hide the voice GIF when listening ends
    speech.onend = () => {
        btn.style.display = "block";      //show button again
        voice.style.display = "none";
    };



} else {
    alert("Speech Recognition not supported in this browser.");
}
function takeCommand(msg) {
    if (msg.includes("hi nova") || msg.includes("hii") ||msg.includes("hii")|| msg.includes("hello")) {
        speak("Hi! How can I help you?");
    }
    else if (msg.includes("who are you")) {
        speak("I'm virtual assistant");
    }
    else if (msg.includes("how are you")) {
        speak("I’m great, thanks for asking! What about you?");
    }
    else if (msg.includes("good morning")) {
        speak("Good morning! Hope you're having a great day!");
    }
    else if (msg.includes("good afternoon")) {
        speak("Good afternoon! How's your day going?");
    }
    else if (msg.includes("good evening")) {
        speak("Good evening! How was your day?");
    }
    else if (msg.includes("open youtube")) {
        speak("opening youtube...")
        window.open("https://www.youtube.com/");
    }
    else if (msg.includes("open google")) {
        speak("opening google...")
        window.open("https://google.com/");
    }
    else if (msg.includes("open instagram")) {
        speak("opening instagram...")
        window.open("https://instagram.com/");
    }
    else if (msg.includes("open facebook")) {
        speak("opening facebook...")
        window.open("https://facebook.com/");
    }
    else if(msg.includes("thank you")|| ("thank you nova")){
        speak("“You’re welcome! Let me know if you need anything else.”")
    }

     else if (msg.includes("open calculator")) {
        speak("opening calculator...")
        window.open("calculator://");
    }
    else if(msg.includes(console.error())){
        speak("I did not understand. Please try again.");
    } 
    else if(msg.includes("time") ||  msg.includes("what's the time") ||
    msg.includes("tell me the time") ||
    msg.includes("current time")){
        let time= new Date().toLocaleString(undefined,{hour:"numeric", minute:"numeric"})
        speak(`it's${time}`)
    }
     else if(msg.includes("date")||  msg.includes("what's the date") ||
    msg.includes("tell me the date") || msg.includes("current date")){
        let date= new Date().toLocaleString(undefined,{day:"numeric", month:"short"})
        speak(date)
    }
   else {
    let final = msg.replace(/nova/gi, "").replace(/innova/gi, "").replace(/tell me about/gi, "").replace(/who is/gi, "").replace(/open/gi,"")
   
; // removes both Nova and Innova (case-insensitive)
    speak(`This is what I found on the internet regarding ${final.trim()}`);
    window.open(`https://www.google.com/search?q=${final.trim()}`);
}

///nova/gi → “g” = replace all, “i” = ignore case
//.replace(...).replace(...) → ensures both “Nova” and “Innova” get removed
//.trim() → cleans up extra spaces//
}



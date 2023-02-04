const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10;

const checkConection = async () => {
    try {
        //try to fetch random data from the API
        //200 and 300, the network connection is considered online
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false; //if there is an error, the conection is considered offline
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if(status) { //if the status is true(online), update the icon, title and description accordingly
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet."
        popup.classList.add("online")
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    //if the status is false(offline), update the icon, title and description accordingly
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Conection";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds."
    popup.className = "popup show";

    intervalId = setInterval(() => { //set an interval to decrease the timer by 1 every second
        timer--;
        if(timer === 0) checkConection(); //if the timer reaches 0, check the conection again
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

//only if isOnline is true, check the connection status every 3 seconds
setInterval(() => isOnline && checkConection(), 3000);

reconnectBtn.addEventListener("click", checkConection);
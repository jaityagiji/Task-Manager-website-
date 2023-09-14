function dating(){
    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
}
setInterval(dating,1000);

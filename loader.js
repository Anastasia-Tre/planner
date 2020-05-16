
loadScript();

function loadScript() {

    include('record.js');
    include('data.js');
    //include('day.js');
    include('sort.js');
    include('draw.js');
    include('mini-calendar.js');


    
}

function include(url) {
    const script = document.createElement("script");
    script.onload = callback;
    script.src = url;
    script.async = false;
    document.head.appendChild(script);
}

function callback() {
    console.log(this.src + ' - has been loaded');
}
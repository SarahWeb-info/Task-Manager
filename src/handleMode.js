export function handleMode (){
    const nightMode = localStorage.getItem('nightMode');
    if (nightMode) {

        if (nightMode == 'true') {
            localStorage.setItem('nightMode', 'false');           
            document.documentElement.style.setProperty('--bg', '#ffffff');
            document.documentElement.style.setProperty('--color', 'rgb(16, 16, 16)');      
        }else{
            localStorage.setItem('nightMode', 'true');           
            document.documentElement.style.setProperty('--bg', 'rgb(16, 16, 16)');
            document.documentElement.style.setProperty('--color', '#ffffff');   
        }
    }else{
        localStorage.setItem('nightMode', 'true');           
        document.documentElement.style.setProperty('--bg', 'rgb(16, 16, 16)');
        document.documentElement.style.setProperty('--color', '#ffffff');
    }
}

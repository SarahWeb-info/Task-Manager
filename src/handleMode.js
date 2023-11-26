export function handleMode (){
    const nightMode = localStorage.getItem('nightMode');
    if (nightMode) {

        if (nightMode === 'true') {
            localStorage.setItem('nightMode', 'false');           
            document.documentElement.style.setProperty('--bg', '#ffffff');
            document.documentElement.style.setProperty('--color', 'rgb(30, 30, 30)');      
        }else{
            localStorage.setItem('nightMode', 'true');           
            document.documentElement.style.setProperty('--bg', 'rgb(30, 30, 30)');
            document.documentElement.style.setProperty('--color', '#ffffff');   
        }
    }else{
        localStorage.setItem('nightMode', 'true');           
        document.documentElement.style.setProperty('--bg', 'rgb(30, 30, 30)');
        document.documentElement.style.setProperty('--color', '#ffffff');
    }
}

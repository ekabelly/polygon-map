export let Microsoft;

export function loadBingApi(key) {
    const callbackName = "bingAPIReady";
    let url = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}`;
    if (key) {
        url += `&key=${key}`;
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = url;
        window[callbackName] = () => {
            Microsoft = window.Microsoft;
            resolve();
        };
        script.onerror = (error) => {
            reject(error);
        };
        document.body.appendChild(script);
    });
}

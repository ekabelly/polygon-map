import axios from 'axios';
import config from "../config";

export const autoComplete = async query => {
    try {
        return (await axios.get(`${config.locationBaseUrl}?q=${query}&o=json&key=${process.env.REACT_APP_BING_MAPS_KEY}`))
            // there is normally only 1 result sets for a request with these query params
            .data.resourceSets[0].resources.map(resource => {
                const [lat, lng] = resource.point.coordinates;
                // return an object with only the required data
                return {name: resource.name, lng, lat};
            });
    } catch (e) {
        console.error(e);
    }
}

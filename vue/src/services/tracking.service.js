import axios from "axios";
import authHeader from "./auth-header";

/**
 * Post to store data tracking against logged in user
 * @param {Object} data 
 * @param {String} data.eventName - Event to track
 * @param {?Object} data.properties - Optional additional object to store with event
 * @returns {Promise.<Object>}
 */
const trackEvent = (data) => {
  axios.defaults.headers.common.Authorization = authHeader().Authorization;
  return axios.post(`${process.env.SERVER_URL}/data/record`, data);
};

export default trackEvent;

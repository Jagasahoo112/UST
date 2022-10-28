import { flatten, uniq } from "lodash";

import { API_URL } from "../../Constants";
const API_BASE = API_URL;

//const API_BASE = "http://127.0.0.1:5000";
const APidetails = "autocomplete_app";
const get = async ({ endpoint, text }) => {
  try {
    const response = await fetch(`${API_BASE}/${APidetails}/${endpoint}/${encodeURIComponent(text)}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const post = async ({ endpoint, body }) => {
  try {
    const response = await fetch(`${API_BASE}/${APidetails}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getHeaderSuggestions = async (text) => {
  const endpoint = "autocomplete-headers";

  try {
    const response = await get({ endpoint, text });

    return uniq(flatten(response));
  } catch (error) {
    console.error(error);
  }
};

const getBoilerplate = async (text) => {
  const endpoint = "autocomplete-section";

  try {
    const response = await get({ endpoint, text });

    return [response.boilerplate]
  } catch (error) {
    console.error(error);
  }
}

export default {
  getHeaderSuggestions,
  getBoilerplate
};

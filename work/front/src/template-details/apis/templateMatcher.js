import createFile from "../helpers/createFile";
import { API_URL } from "../../Constants";

const API_BASE = API_URL;
//const API_BASE = "http://127.0.0.1:5000";

const APidetails = "template_verification_assistance_app";

const get = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE}/${APidetails}/${endpoint}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getResults = async () => {
  return await get("get-results");
};

const postForm = async ({ endpoint, form }) => {
  try {
    const response = await fetch(`${API_BASE}/${APidetails}/${endpoint}`, {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const uploadFile = async ({ fileData, fileName, fileType }) => {
  const endpoint = "file-upload";

  try {
    const file = createFile({ fileData, fileName, fileType });

    const form = new FormData();
    form.append("file", file);

    const response = await postForm({ endpoint, form });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getResults,
  uploadFile,
};

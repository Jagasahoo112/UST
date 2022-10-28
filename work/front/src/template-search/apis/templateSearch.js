// const API_BASE = "http://127.0.0.1:5000";
import { API_URL } from "../../Constants";
const API_BASE = API_URL;

const PLACEHOLDER_DATA = [
  { id: 1,
    name: 'example template 1.docx',
    createdAt: '2022/10/20',
    author: null
  },
  { id: 2,
    name: 'example template 2.docx',
    createdAt: '2019/9/21',
    author: 'Scott Summers'
  },
  { id: 3,
    name: 'example template 3.docx',
    createdAt: '2016/8/12',
    author: 'Scott Summers'
  }
]
const APidetails = "search_template_app";
const get = async (endpoint) => {
  try {
      const response = await fetch(`${API_BASE}/${APidetails}/${endpoint}`, {
      method: "GET",
    });

    const data = await response.json();
    //const data = PLACEHOLDER_DATA

    return data;
  } catch (error) {
    console.error(error);
  }
};

const searchTemplates = async (query) => {
  //return await get(`search-template-data?input=${query}`);
  return await get(`search-template-data/${query}`);
};

export default {
    searchTemplates
}
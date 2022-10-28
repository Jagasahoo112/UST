import React, { useState } from "react";
import PropTypes from "prop-types";
import Progress from "./Progress";
import Header from "./Header";
import SearchInput from "./SearchInput";
import SearchResult from './SearchResult';
import templateSearchApi from "../apis/templateSearch";
import NoRecordsFound from "./Norecordsfound";
import { Spinner, SpinnerSize } from "@fluentui/react";
/* global Word, Office */
import { API_URL } from "../../Constants";

const API_BASE = API_URL;
const APidetails = "template_verification_assistance_app";
const TEMPLATE_BASE_URL= API_BASE+'/'+APidetails+'/download-file/'

const App = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOfficeInitialized, title } = props;
  const [noRecords, setNoRecords] = useState(false);
  

  async function handleSubmit(query) {
    try{
      
    
     setLoading(true);
     console.log("loading"+loading);
     const results = await templateSearchApi.searchTemplates(query) 
     console.log(results);
     console.log(results.length);
     if(results.length!=0) 
     {
      console.log("setSearchResults");
      setLoading(false);
      setSearchResults(results)     
     }     
     else
     {
      console.log("Norecordsfound");
      setNoRecords(true)
      setSearchResults([]);
      NoRecordsFound()
      setLoading(false);
     }     
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
   
  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={require("./../../../assets/ey-logo-80.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }
  
  return (
    <div className="template-search">
      <Header title="Template Search" />

      <SearchInput onSubmit={handleSubmit} />
       
      <div className="search-results">
      { loading && <Spinner size={SpinnerSize.large} /> }
      {searchResults.length != 0 &&  !loading &&
          searchResults.map((item, i) => {  
          return <SearchResult key={`search-result-${i}`} item={item} href={`${TEMPLATE_BASE_URL}${item["Name"]}`} />
        })}
        {console.log(!loading , searchResults.length === 0 , noRecords)}
        { !loading && searchResults.length === 0 && noRecords &&
           <NoRecordsFound />
        } 
      </div> 
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};

export default App;

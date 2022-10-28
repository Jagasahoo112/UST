import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Progress from "./Progress";
import Header from "./Header";
import DetailItem from "./DetailItem";
import WarningBox from "./WarningBox";
import DownloadLink from "./DownloadLink";
import { Spinner, SpinnerSize } from "@fluentui/react";
import templateMatcherApi from "../apis/templateMatcher";
import { getFileName, getFileType } from "../helpers/filePathHelpers";
import getDisplayDate from "../helpers/getDisplayDate";

/* global Word, Office */

const App = (props) => {
  const [fileData, setFileData] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [documentName, setDocumentName] = useState(null);
  const [documentVersion, setDocumentVersion] = useState(null);
  const [latestVersion, setLatestVersion] = useState(null);
  const [latestVersionUrl, setLatestVersionUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const { title, isOfficeInitialized } = props;

  useEffect(() => {
    if (isOfficeInitialized) {
      if (!fileData) {
        getFileData();
      }

      if (!fileUrl) {
        getFileUrl();
      }

      if (fileData && fileUrl) {
        const fileName = getFileName(fileUrl);
        const fileType = getFileType(fileUrl);

        templateMatcherApi.uploadFile({ fileData, fileName, fileType }).then((response) => {
          console.log("upload file response:", response);

          templateMatcherApi.getResults().then((response) => {
            console.log("match results:", response);

            setNewVersionAvailable(response.newVersionAvailable);
            setDocumentName(response.documentName);
            setDocumentVersion(response.documentVersionDate);
            setLatestVersion(response.latestVersionDate);
            setLatestVersionUrl(response.latestVersionUrl);
            setLoading(false);
          });
        });
      }
    }
  }, [isOfficeInitialized, fileData, fileUrl]);

  async function getFileData() {
    Office.context.document.getFileAsync(Office.FileType.Compressed, (asyncResult) => {
      asyncResult.value.getSliceAsync(0, (result) => {
        setFileData(result.value.data);
      });
    });
  }

  async function getFileUrl() {
    Office.context.document.getFilePropertiesAsync((asyncResult) => {
      const fileUrl = asyncResult.value.url;

      if (!fileUrl) {
        console.log("The file hasn't been saved yet. Save the file and try again");
      } else {
        setFileUrl(fileUrl);
      }
    });
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
    <div className="template-details">
      <Header title="Template Details" />

      {loading ? (
        <Spinner size={SpinnerSize.large} />
      ) : (
        <div className="detail-items">
          <DetailItem
            {...{
              label: "Template Name",
              value: documentName || "No data available",
            }}
          />

          <DetailItem
            {...{
              label: "Template Version",
              value: getDisplayDate(documentVersion),
              valueSibling: newVersionAvailable ? (
                <WarningBox message="New Template Available" />
              ) : (
                <div className="latest-template-indicator">Latest Template</div>
              ),
            }}
          />

          {newVersionAvailable && (
            <DetailItem
              {...{
                label: "Latest Version",
                value: getDisplayDate(latestVersion),
                valueSibling: <DownloadLink href={latestVersionUrl} />,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};

export default App;

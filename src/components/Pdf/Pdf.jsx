import { useEffect } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { Get, Put } from "../../services";

import { SelectionMode } from "@react-pdf-viewer/selection-mode";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const Pdf = ({ file, id }) => {
  useEffect(() => {
    const fetchData = async () => {
      await Get(`/pdf/content/${id}`);
    };
    fetchData();
  }, [id]);

  const toolbarPluginInstance = toolbarPlugin({
    getFilePlugin: {
      fileNameGenerator: (file) => {
        const fileName = file.name.substring(file.name.lastIndexOf("/") + 1);
        window.location.reload();
        return `a-copy-of-${fileName}`;
      },
    },
    searchPlugin: {
      keyword: "PDF",
    },
    selectionModePlugin: {
      selectionMode: SelectionMode.Hand,
    },
  });

  const { Toolbar } = toolbarPluginInstance;
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
      <div
        style={{
          height: "600px",
          color: "blue",
        }}
      >
        <Toolbar />
        <Viewer
          plugins={[toolbarPluginInstance]}
          fileUrl={"http://localhost:5000/app/pdf/" + file}
        />
      </div>
    </Worker>
  );
};

export default Pdf;

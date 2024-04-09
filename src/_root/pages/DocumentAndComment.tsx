import DocViewer, { DocViewerRenderers} from "@cyntler/react-doc-viewer";

function DocumentAndComment(){

  const docs = [
    { uri: "https://quiet-hyena-solely.ngrok-free.app/api/document/4",
      fileType: "docx",
      fileName: "ngu.docx"
    },
  ];

  return (
    <div>
      <h1>Documents Demo</h1>
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}
        style ={{height:1000}}
      />
    </div>
  )
}

export default DocumentAndComment;
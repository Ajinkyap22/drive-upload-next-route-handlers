"use client";

import React, { useState } from "react";

const driveId = process.env.NEXT_PUBLIC_SHARED_DRIVE_ID;

const Page = () => {
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const createFolder = async () => {
    const body = {
      folderId: driveId,
      folderName,
    };

    const res = await fetch("/api/createFolder", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    const id = data.folder.data.id;
    const link = `https://drive.google.com/drive/folders/${id}`;

    // redirect to folder link
    const win = window.open(link, "_blank");
    win!.focus();
  };

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("folderId", folderId);
    formData.append("file", file);
    formData.append("driveId", driveId!);

    const res = await fetch("/api/uploadFile", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const link = data.fileLink.webViewLink;

    // redirect to file link
    const win = window.open(link, "_blank");
    win!.focus();
  };

  return (
    <div>
      <div className="form-group">
        <h1>Create Folder</h1>

        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />

        <button onClick={createFolder}>Create Folder</button>
      </div>

      <div className="form-group">
        <h1>Upload File</h1>

        <input
          type="text"
          placeholder="Parent Folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
        />

        <input
          type="file"
          placeholder="File"
          onChange={(e) => setFile(e.target.files![0])}
        />

        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
};

export default Page;

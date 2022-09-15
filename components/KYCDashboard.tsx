import { useState, useRef } from "react";
import Button from "./shared/Button";
import InputField from "./shared/InputField";
import { Web3Storage } from "web3.storage";
import { serverInstance } from "../utils/apiServices";

enum KYCTabs {
  VERIFY = "Verify my Identity",
  UPDATE_ACCOUNT = "Update my account",
  WITHDRAWAL = "Withdrawal methods",
}

const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBiNTlBMTg4NzdmYmRlMjhlZjUzNUJlQTg1MzBGMjlDYmFDMkY1QzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjMxNTUwNDA3NDEsIm5hbWUiOiJTYWZpcGF5In0.WZXiF2KM9ykaScPS-HpTkHIumL8zGWSAVdS9uysMgDo",
});

/*const fileInput = document.querySelector('input[type="file"]')

// Pack files into a CAR and send to web3.storage
const rootCid = await client.put(fileInput.files) // Promise<CIDString>

// Get info on the Filecoin deals that the CID is stored in
const info = await client.status(rootCid) // Promise<Status | undefined>

// Fetch and verify files from web3.storage
const res = await client.get(rootCid) // Promise<Web3Response | null>
const files = await res.files() // Promise<Web3File[]>
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`)
}*/

const KYCDashboard = () => {
  const inputFile = useRef(null);
  const [cardBackgroundCSS, setCardBackgroundCSS] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [msgUploadingIPFS, setMsgUploadingIPFS] = useState(null);
  const [kyc_info, setKYCInfo] = useState({});

  const handleIDUpload = () => {
    inputFile.current.click();
  };

  const handleSaveKYCInfo = async () => {
    console.log(kyc_info);

    if (selectedFile) {
      if (confirm("Are you sure you want to save this information?")) {
        try {
          const fileInput = document.querySelector('input[type="file"]');
          setMsgUploadingIPFS(
            "Encrypting and uploading to file the IPFS network..."
          );
          const rootCid = await client.put([selectedFile]);
          setMsgUploadingIPFS(`File CID ${rootCid}`);
          kyc_info["ID_CID"] = rootCid;
          const data = await serverInstance.putRequest(
            "user/kyc/set",
            kyc_info,
            true
          );
          if (data && data._id) {
            localStorage.user = JSON.stringify(data);
            alert(
              "KYC information saved successfully.\nYou will be informed when your KYC is approved."
            );
          }
        } catch (e) {
          setMsgUploadingIPFS(
            "Failed to upload the file to IPFS network, please try again."
          );
        }
      }
    } else {
      alert("Please select your ID before you save.");
    }
  };

  const handleFileAdded = (e) => {
    var file = e.target.files[0];
    setSelectedFile(file);
    var reader = new FileReader();
    reader.readAsDataURL(file); //readAsText(file,'UTF-8');

    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result; // this is the content!
      //convert to base 64 image
      console.log(file);
      console.log("Setting image");
      setCardBackgroundCSS(content);
    };
  };

  const [currentTab, setCurrentTab] = useState<KYCTabs>(KYCTabs.VERIFY);
  const tabs = [KYCTabs.VERIFY, KYCTabs.UPDATE_ACCOUNT, KYCTabs.WITHDRAWAL];
  const fields = [
    {
      placeholder: "Enter your legal first name here ",
      label: "Legal first name",
      name: "first_name",
    },
    {
      placeholder: "Legal middle name ",
      label: "Legal middle name",
      name: "middle_name",
    },
    {
      placeholder: "Enter your legal last name ",
      label: "Legal last name",
      name: "last_name",
    },
    {
      placeholder: "Enter your birthdate ",
      label: "Birthdate",
      name: "birthdate",
    },
    {
      placeholder: "Enter your place of birth ",
      label: "Place of birth",
      name: "place_of_birth",
    },
    {
      placeholder: "Enter your nationality",
      label: "Nationality",
      name: "nationality",
    },
    {
      placeholder: "Enter your legal ID number",
      label: "ID number",
      name: "id_number",
    },
    {
      placeholder: "Enter the country of issue of your ID",
      label: "Country of issue",
      name: "country_of_issue",
    },
    {
      placeholder: "Enter your address ",
      label: "Address line 1 ",
      name: "address_line_1",
    },
    { placeholder: "Enter your city", label: "City", name: "city" },
    {
      placeholder: "Enter your state or province",
      label: "State/province",
      name: "province",
    },
    { placeholder: "Select your country", label: "Country", name: "country" },
  ];

  const pwdFields = [
    { placeholder: "Old password ", label: "Old password" },
    { placeholder: "Enter the new password here", label: "New password" },
    {
      placeholder: "Re-type the new password here",
      label: "Confirm new password",
    },
  ];

  const user_info = JSON.parse(localStorage.user);
  const ipfs_verification_link =
    user_info.kyc_info && user_info.kyc_info.ID_CID
      ? `https://${user_info.kyc_info.ID_CID}.ipfs.w3s.link`
      : null;

  return (
    <div className="kyc-tab-wrapper p-8">
      <div className="header">
        <h2>KYC verification</h2>
      </div>
      <div className="flex flex-row w-full justify-between mt-12">
        {tabs.map((t, i) => (
          <p
            key={i}
            onClick={() => setCurrentTab(t)}
            className={`${
              currentTab === t ? "active" : ""
            } tab pb-4 w-full cursor-pointer`}
          >
            {t}
          </p>
        ))}
      </div>
      {currentTab === KYCTabs.VERIFY ? (
        <div className="md:w-4/5 w-full form-content">
          {fields.map((f, i) => (
            <InputField
              type="text"
              label={f.label}
              key={i}
              onTextChange={(t) => {
                setKYCInfo({ ...kyc_info, [f.name]: t });
              }}
              value={
                user_info.kyc_info && user_info.kyc_info[f.name]
                  ? user_info.kyc_info[f.name]
                  : ""
              }
              placeholder={f.placeholder}
            />
          ))}
          {ipfs_verification_link ? (
            <div>
              <a
                style={{ textDecoration: "underline" }}
                target="_blank"
                href={ipfs_verification_link}
              >
                View the ID on IPFS({user_info.kyc_info.ID_CID})
              </a>
            </div>
          ) : (
            ""
          )}
          <div
            style={{ position: "relative" }}
            onClick={handleIDUpload}
            className="id-photo-wrapper w-full flex justify-center items-center"
          >
            <img
              style={{
                position: "absolute",
                maxHeight: "100%",
                borderRadius: "20px",
              }}
              src={cardBackgroundCSS}
            />
            <p>Click here to add your ID</p>
            <input
              type="file"
              onChange={handleFileAdded}
              name="addingFile"
              style={{ display: "none" }}
              ref={inputFile}
            />
          </div>
          <div>{msgUploadingIPFS}</div>
          <div className="py-4" />
          <Button
            label="SAVE"
            icon="/assets/shared/save.svg"
            width={170}
            onClick={handleSaveKYCInfo}
            type="filled"
          />
        </div>
      ) : currentTab === KYCTabs.UPDATE_ACCOUNT ? (
        <div className="md:w-4/5 w-full">
          <InputField
            type="text"
            label="Your names"
            placeholder="Enter your names"
            onTextChange={(t) => {}}
          />
          <div className="py-4" />
          <Button
            label="SAVE"
            icon="/assets/shared/save.svg"
            width={170}
            onClick={() => {}}
            type="filled"
          />
          {pwdFields.map((f, i) => (
            <InputField
              type="text"
              label={f.label}
              placeholder={f.placeholder}
              onTextChange={(t) => {}}
            />
          ))}
          <div className="py-4" />
          <Button label="SAVE" width={170} type="filled" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default KYCDashboard;

import { useState } from "react";
import Button from "./shared/Button";
import InputField from "./shared/InputField";

enum KYCTabs {
  VERIFY = "Verify my Identity",
  UPDATE_ACCOUNT = "Update my account",
  WITHDRAWAL = "Withdrawal methods",
}

const KYCDashboard = () => {
  const [currentTab, setCurrentTab] = useState<KYCTabs>(KYCTabs.VERIFY);
  const tabs = [KYCTabs.VERIFY, KYCTabs.UPDATE_ACCOUNT, KYCTabs.WITHDRAWAL];
  const fields = [
    {
      placeholder: "Enter your legal first name here ",
      label: "Legal first name",
    },
    { placeholder: "Legal middle name ", label: "Legal middle name" },
    { placeholder: "Enter your legal last name ", label: "Legal last name" },
    { placeholder: "Enter your birthdate ", label: "Birthdate" },
    { placeholder: "Enter your place of birth ", label: "Place of birth" },
    { placeholder: "Enter your nationality", label: "Nationality" },
    { placeholder: "Enter your legal ID number", label: "ID number" },
    {
      placeholder: "Select the country of issue of your ID",
      label: "Country of issue",
    },
    { placeholder: "Enter your address ", label: "Address line 1 " },
    { placeholder: "Enter your city", label: "City" },
    { placeholder: "Enter your state or province", label: "State/province" },
    { placeholder: "Select your country", label: "Country" },
  ];

  const pwdFields = [
    { placeholder: "Old password ", label: "Old password" },
    { placeholder: "Enter the new password here", label: "New password" },
    {
      placeholder: "Re-type the new password here",
      label: "Confirm new password",
    },
  ];

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
        <div className="w-4/5 form-content">
          {fields.map((f, i) => (
            <InputField
              label={f.label}
              key={i}
              onTextChange={(t) => {}}
              placeholder={f.placeholder}
            />
          ))}
          <div className="id-photo-wrapper w-full flex justify-center items-center">
            <p>Click here to add your ID</p>
          </div>
          <div className="py-4" />
          <Button
            label="SAVE"
            icon="/assets/shared/save.svg"
            width={170}
            onClick={() => {}}
            type="filled"
          />
        </div>
      ) : currentTab === KYCTabs.UPDATE_ACCOUNT ? (
        <div className="w-4/5">
          <InputField
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
              label={f.label}
              placeholder={f.placeholder}
              onTextChange={(t) => {}}
            />
          ))}
          <div className="py-4" />
          <Button label="SAVE" width={170} onClick={() => {}} type="filled" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default KYCDashboard;

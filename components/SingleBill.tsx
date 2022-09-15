import { FC,useState } from "react";
import { Bill } from "./BillsDashboard";
import Button from "./shared/Button";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { setTimeout } from "timers";

const SingleBill: FC<Bill> = (props) => {
  const [copyLinkText,setCopyLinkText] = useState("COPY LINK");
  const { title, description, amount,created, payed_at, currency, email_to, attachments, payed, viewed, unique_url_param } = props;
  const status = payed ? 'Paid' : 'Pending';
  const invoice_url = window.location.origin + '/new-invoice?invoice_id=' + unique_url_param;

  const handleCopied = () => {
      setCopyLinkText("COPIED");
      setTimeout(() => {
        setCopyLinkText("COPY LINK");
      }, 2000);
  }

  return (
    <div className="single-bill p-5 rounded-2xl">
      <p className="client-label mb-3">{title}</p>
      <p className="periiod">{description} payment</p>
      <p className="amount mt-3 mb-5">
        {amount} {currency}
      </p>
      <p className="issuer">Sent to {email_to} </p>
      <p className="datetime pt-3 pb-4">Since {created}</p>
      <div className="status-wrapper flex flex-row mb-4">
        <div className={`status ${status.toLowerCase()} mr-4`} />
        <h3>{status}</h3>
      </div>
      <div style={{marginTop: '10px', marginBottom: '10px', backgroundColor:'#d7d7d7', padding : '5px', borderRadius: '10px'}}>

          <small><a href={invoice_url} target="_blank">{invoice_url}</a></small>
      </div>
      <div className="btns flex flex-row items-center justify-between gap-4">
      <CopyToClipboard text={invoice_url} onCopy={handleCopied}>
        <Button
          icon="/assets/shared/copy.svg"
          label={copyLinkText}
          type="filled"
          hasShaddow
        />
        </CopyToClipboard>
        <Button
          icon="/assets/shared/message.svg"
          label="RESEND BILL"
          type="filled-secondary"
          hasShaddow
          onClick={() => alert("Not yet implemented")}
        />
      </div>
    </div>
  );
};

export default SingleBill;

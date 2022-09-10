import { FC } from "react";
import { Bill } from "./BillsDashboard";
import Button from "./shared/Button";

const SingleBill: FC<Bill> = (props) => {
  const { amount, client, paymentDate, period, status, currency } = props;
  return (
    <div className="single-bill">
      <p className="client-label">{client}</p>
      <p className="periiod">{period} payment</p>
      <p className="amount">
        {amount} {currency}
      </p>
      <p className="issuer">Sent to johnp@actom.com </p>
      <p className="datetime">{paymentDate}</p>
      <div className="status-wrapper">
        <div className={`status ${status.toString().toLowerCase()}`} />
        <h3>{status}</h3>
      </div>
      <div className="btns flex flex-row items-center justify-between">
        <Button
          icon="/assets/shared/copy.svg"
          label="COPY LINK"
          type="filled"
          hasShaddow
        />
        <Button
          icon="/assets/shared/message.svg"
          label="RESEND BILL"
          type="filled-secondary"
          hasShaddow
        />
      </div>
    </div>
  );
};

export default SingleBill;

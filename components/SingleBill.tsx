import { FC } from "react";
import { Bill } from "./BillsDashboard";
import Button from "./shared/Button";

const SingleBill: FC<Bill> = (props) => {
  const { amount, client, paymentDate, period, status, currency } = props;
  return (
    <div className="single-bill p-5 rounded-2xl">
      <p className="client-label mb-3">{client}</p>
      <p className="periiod">{period} payment</p>
      <p className="amount mt-3 mb-5">
        {amount} {currency}
      </p>
      <p className="issuer">Sent to johnp@actom.com </p>
      <p className="datetime pt-3 pb-4">{paymentDate}</p>
      <div className="status-wrapper flex flex-row mb-4">
        <div className={`status ${status.toString().toLowerCase()} mr-4`} />
        <h3>{status}</h3>
      </div>
      <div className="btns flex flex-row items-center justify-between gap-4">
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

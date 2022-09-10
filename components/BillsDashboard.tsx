import { FC } from "react";
import Button from "./shared/Button";

export interface Bill {
  client: string;
  amount: string;
  period: string;
  paymentDate: string;
  status: "PENDING" | "PAID" | "REFUSED";
  currency: string;
}

interface BillsProps {
  data: Bill[];
}

const BillsDashboard: FC<BillsProps> = () => {
  return (
    <div className="bills-dash">
      <div className="bills-header">
        <div className="">
          <h2>Your bills</h2>
          <p className="sub-title">in one place</p>
        </div>
        <Button
          label="New bill"
          type="filled"
          width={130}
          icon="/assets/shared/file.svg"
        />
      </div>
      <div className="cards"></div>
    </div>
  );
};

export default BillsDashboard;

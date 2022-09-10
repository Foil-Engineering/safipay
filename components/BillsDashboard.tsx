import { FC, useState } from "react";
import Button from "./shared/Button";
import SingleBill from "./SingleBill";

export interface Bill {
  client: string;
  amount: string;
  period: string;
  paymentDate: string;
  status: "Pending" | "Paid" | "Refused";
  currency: string;
}

interface BillsProps {
  data: Bill[];
}

const BillsDashboard: FC<BillsProps> = (props) => {
  const { data } = props;
  const [showBillModal, setShowBillModal] = useState<boolean>(false);

  return (
    <div className="bills-dash p-8">
      <div className="bills-header flex flex-row justify-between">
        <div className="">
          <h2>Your bills</h2>
          <p className="sub-title">in one place</p>
        </div>
        <Button
          label="New bill"
          type="filled"
          width={170}
          icon="/assets/shared/file.svg"
          onClick={() => setShowBillModal(true)}
        />
      </div>
      <div className="cards grid-d3-t2-m1 mt-12 gap-5">
        {data.map((d, idx) => (
          <SingleBill {...d} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default BillsDashboard;

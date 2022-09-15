import Button from "./shared/Button";
import InputField from "./shared/InputField";
import SingleBill from "./SingleBill";

import React, { Component } from "react";
import { serverInstance } from "../utils/apiServices";
import { toast } from "react-toast";

export interface Bill {
  client: string;
  amount: string;
  period: string;
  paymentDate: string;
  status: "Pending" | "Paid" | "Refused";
  currency: string;
  props: any;

  title: string;
  description: string;
  created: string;
  payed_at: string;
  email_to: string;
  attachments: string;
  payed: string;
  viewed: string;
  unique_url_param: string;
}

interface BillsProps {
  data: Bill[];
}

export default class BillsDashboard extends Component<BillsProps> {
  state = {
    showBillModal: false,
    loading: false,
    new_bill: {
      title: "",
      description: "",
      currency: "USD",
      amount: 0,
      email_to: "",
      attachment: [],
    },
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const data = await serverInstance.postRequest(
        "bill/add",
        this.state.new_bill,
        true
      );
      console.log(data);
      this.setState({ showBillModal: false });
      // refresh the page to get bills
      window.location.reload();
      this.setState({ loading: false });
      toast.success('Invoice sent to your client');
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  render() {
    const data = this.props && this.props.data ? this.props.data : [];
    return (
      <div className="bills-dash p-8">
        <div className="header flex sm:flex-row flex-col justify-between">
          <div className="pb-4 sm:pb-0">
            <h2>Your bills</h2>
            <p className="sub-title">in one place</p>
          </div>
          <Button
            label="New bill"
            type="filled"
            width={170}
            icon="/assets/shared/file.svg"
            onClick={() => this.setState({ showBillModal: true })}
          />
        </div>
        <div className="cards grid-d3-t2-m1 mt-12 gap-5">
          {data.map((d, idx) => (
            <SingleBill {...d} key={idx} />
          ))}
        </div>
        {this.state.showBillModal ? (
          <div className="absolute container-modal inset-0 z-10 py-10">
            <div className="modal-invoice rounded-3xl">
              <div className="modal-wrapper w-full">
                <h3 className="mb-5">New bill</h3>
                <form onSubmit={this.handleFormSubmit}>
                  <div className="form-new-invoice px-6 py-10 gap-28 rounded-3xl flex flex-row justify-between">
                    <div className="form-main flex-1">
                      <InputField
                        type="text"
                        label="Title"
                        placeholder="Enter the title of your bill here"
                        onTextChange={(t) => {
                          this.setState({
                            new_bill: { ...this.state.new_bill, title: t },
                          });
                        }}
                      />
                      <InputField
                        type="text"
                        label="Description"
                        placeholder="Enter the description of your bill here"
                        onTextChange={(t) => {
                          this.setState({
                            new_bill: {
                              ...this.state.new_bill,
                              description: t,
                            },
                          });
                        }}
                      />
                      <InputField
                        type="text"
                        label="Amount ($)"
                        placeholder="0.00"
                        onTextChange={(t) => {
                          this.setState({
                            new_bill: { ...this.state.new_bill, amount: t },
                          });
                        }}
                      />
                      <InputField
                        type="text"
                        label="Send to "
                        placeholder="Enter the employee email address here"
                        onTextChange={(t) => {
                          this.setState({
                            new_bill: { ...this.state.new_bill, email_to: t },
                          });
                        }}
                      />
                      <div className="pt-8 pb-4">
                        <Button
                          label="SUBMIT & SEND"
                          type="filled"
                          icon="/assets/shared/save.svg"
                          width={240}
                          loading={this.state.loading}
                        />
                        <p
                          onClick={() =>
                            this.setState({ showBillModal: false })
                          }
                          className="cancel-btn mt-4"
                        >
                          Cancel
                        </p>
                      </div>
                    </div>
                    <div className="actions">
                      <Button
                        type="filled-secondary"
                        label="Attach files ..."
                        icon="/assets/shared/pin.svg"
                        width={190}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

/*const BillsDashboard: FC<BillsProps> = (props) => {
  const { data } = props;
  const [showBillModal, setShowBillModal] = useState<boolean>(false);

  
};

export default BillsDashboard;*/

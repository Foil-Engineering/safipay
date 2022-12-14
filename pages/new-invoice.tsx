import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/shared/Button";
import { serverInstance } from "../utils/apiServices";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  SAFIPAY_VAULT_ADDRESS,
} from "../utils/constants";

enum STEPS {
  PAY_NOW = "PAY_NOW",
  CANCELED = "CANCELED",
  PAID = "PAID",
  INITIAL = "INITIAL",
  NO_WALLET = "NO_WALLET",
  PAYMENT_FAILED = "PAYMENT_FAILED",
}

enum WALLETS {
  METAMASK = "metamask",
  COINBASE = "coinbase",
}

const NewInvoice = () => {
  const [step, setStep] = useState<STEPS>(STEPS.INITIAL);
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState();
  const [bill_by, setBillBy] = useState();
  const [bill_id, setBillId] = useState();
  const [names, setNames] = useState();

  const router = useRouter();

  var invoice_id;

  const loadInvoice = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    invoice_id = urlParams.get("invoice_id");

    const data = await serverInstance.getRequest(`bill/${invoice_id}`);
    const { amount, currency, payed, title, created, _id } = data.bill;
    const { names, email } = data.user;
    setAmount(amount);
    setCurrency(currency);
    setBillBy(bill_by);
    setBillId(_id);
    setNames(names);
  }; // TO BE CALLING APIs

  const pay = async (amount: number) => {
    const provider = window.ethereum;

    if (provider) {
      //await switchChain(provider);
      await provider.request({ method: "eth_requestAccounts" });
      const connection = new ethers.providers.Web3Provider(provider);
      const signer = connection.getSigner();
      const usdtContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await usdtContract.transfer(
        SAFIPAY_VAULT_ADDRESS,
        ethers.utils.parseUnits(amount.toString(), 18)
      );
      await tx.wait();
      setStep(STEPS.PAID);
    } else {
      setStep(STEPS.NO_WALLET);
      console.log("no wallet detected");
    }
  };

  const switchChain = async (provider: any) => {
    const chainId = await provider.request({ method: "eth_chainId" });
    console.log("Chain ID",chainId);
    try {
      if (chainId !== "0x5") {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadInvoice();
  }, []);

  return (
    <div className="new-invoice-wrapper py-28">
      <Head>
        <title>Safipay - Invoice</title>
      </Head>
      <div className="section-wrapper rounded-3xl flex flex-col items-center py-12">
        <div className="logo flex justify-center items-center mb-20">
          <h4>SafiPay</h4>
        </div>
        {step === STEPS.INITIAL ? (
          <>
            <p className="intro pb-8">You have a new bill</p>

            <p className="amount pb-10">
              {amount} {currency}
            </p>
            <Button
              label="DISCOVER"
              type="filled"
              onClick={() => setStep(STEPS.PAY_NOW)}
              width={220}
            />
            <div className="py-4" />
            <Button
              label="CANCEL"
              type="filled-danger"
              onClick={() => setStep(STEPS.CANCELED)}
              width={220}
            />
            <p className="btm-txt pt-10">
              You need metamask to be able to discover the bill and pay it.
            </p>
          </>
        ) : step === STEPS.PAY_NOW ? (
          <>
            <p className="intro pb-8">Billed by {names}</p>
            <div></div>
            <p className="amount pb-10">
              {amount} {currency}
            </p>
            <p className="intro pb-10">Bill ID : {bill_id}</p>
            <Button
              label="PAY NOW"
              type="filled"
              onClick={async () => {
                try {
                  console.log('hum');
                  await pay(amount);
                } catch (error) {
                  setStep(STEPS.PAYMENT_FAILED);
                  console.log(error);
                }
              }}
              width={220}
            />
            <div className="py-4" />
            <Button
              label="CANCEL"
              type="filled-danger"
              onClick={() => setStep(STEPS.CANCELED)}
              width={220}
            />
          </>
        ) : step === STEPS.PAID ? (
          <>
            <p className="intro pb-8">This bill has been paid</p>
            <p className="intro pb-8">Bill ID : {bill_id}</p>
            <p className="intro pb-10">Already paid.</p>
            <Image
              src="/assets/shared/success.svg"
              height="80px"
              width="80px"
              alt="success"
            />
            <div className="py-4" />
            <Button label="CLOSE" type="filled-danger" link="/" width={220} />
          </>
        ) : step === STEPS.CANCELED ? (
          <>
            <p className="intro pb-8">This bill has been cancelled</p>
            <p className="intro pb-8">Bill ID : {bill_id}</p>
            <Image
              src="/assets/shared/cross.svg"
              height="80px"
              width="80px"
              alt="success"
            />
            <div className="py-4" />
            <Button label="CLOSE" link="/" type="filled-danger" width={220} />
          </>
        ) : step === STEPS.NO_WALLET ? (
          <>
          <p className="intro pb-8">No wallet detected</p>
          <p className="intro pb-8">Please install Coinbase wallet to complete this transaction</p>
          <Button label="CLOSE" link="/" type="filled-danger" width={220} />
            </>
        )
        : step === STEPS.PAYMENT_FAILED ? (
          <>
          <p className="intro pb-8">Payment failed</p>
          <p className="intro pb-8">Failed to complete this transaction</p>
          <Button label="CLOSE" link="/" type="filled-danger" width={220} />
          </>
        ): (
          <></>
        )}
      </div>
    </div>
  );
};

export default NewInvoice;

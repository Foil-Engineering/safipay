import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/shared/Button";
import { CONTRACT_ABI, CONTRACT_ADDRESS, SAFIPAY_VAULT_ADDRESS } from "../utils/constants";

enum STEPS {
  PAY_NOW = "PAY_NOW",
  CANCELED = "CANCELED",
  PAID = "PAID",
  INITIAL = "INITIAL",
}

enum WALLETS{
  METAMASK = "metamask",
  COINBASE = "coinbase"
}

const NewInvoice = () => {
  const [step, setStep] = useState<STEPS>(STEPS.INITIAL);
  const router = useRouter();
  const { invoice_id } = router.query;
  const loadInvoice = async () => {}; // TO BE CALLING APIs

  const pay = async (amount:number) => {
    const provider = window.ethereum
    if (window.ethereum) {
          provider .request({ method: 'eth_requestAccounts' });
          const connection = new ethers.providers.Web3Provider(provider);
          const signer = connection.getSigner();
          const usdtContract = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,signer);
      
          const tx =  await usdtContract.transfer(SAFIPAY_VAULT_ADDRESS,ethers.utils.parseUnits(amount.toString(),18));
          await tx.wait();
        } 
      }
  
  
  useEffect(() => {
    loadInvoice();
  }, []);

  return (
    <div className="new-invoice-wrapper py-28">
      <div className="section-wrapper rounded-3xl flex flex-col items-center py-12">
        <div className="logo flex justify-center items-center mb-20">
          <h4>SafiPay</h4>
        </div>
        {step === STEPS.INITIAL ? (
          <>
            <p className="intro pb-8">You have a new bill</p>
            <p className="amount pb-10">1 300.00 USD</p>
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
            <p className="intro pb-8">Billed by</p>
            <div></div>
            <p className="amount pb-10">1 300.00 USD</p>
            <p className="intro pb-10">Bill ID : 23747434343</p>
            <Button
              label="PAY NOW"
              type="filled"
              onClick={ async() => {
                
                await pay(1300);
                setStep(STEPS.PAID);
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
            <p className="intro pb-8">Bill ID : 23747434343</p>
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
            <p className="intro pb-8">Bill ID : 23747434343</p>
            <Image
              src="/assets/shared/cross.svg"
              height="80px"
              width="80px"
              alt="success"
            />
            <div className="py-4" />
            <Button label="CLOSE" link="/" type="filled-danger" width={220} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NewInvoice;

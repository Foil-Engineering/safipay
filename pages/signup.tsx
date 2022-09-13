import Button from "../components/shared/Button";
import InputField from "../components/shared/InputField";

const Login = () => {
  const loginFields = [
    { placeholder: "Email address" },
    { placeholder: "Names" },
    { placeholder: "Password" },
  ];

  return (
    <div className="section-wrapper login-page-wrapper gap-16 flex flex-row py-10 justify-center">
      <div className="relative illustrations">
        <h1 className="font-normal p-3 text-2xl leading-7 mb-5">SafiPay</h1>
        <div className="login-illustration-bg" />
        <div className="login-illustration-xs" />
        <div className="circle-bg-xs absolute" />
      </div>
      <div className="flex-1">
        <div className="flex flex-row justify-end">
          <Button type="filled" width={130} link="/login" label="Log in" />
        </div>
        <div className="pr-24">
          <div>
            <p className="login-intro">Create an account here </p>
          </div>
          <div className="form">
            <p className="intro-form">
              Please enter your account details to sign up
            </p>
            {loginFields.map((field, idx) => (
              <InputField
                key={idx}
                placeholder={field.placeholder}
                onTextChange={(text) => console.log(text)}
              />
            ))}
            <div className="flex flex-row justify-end">
              <p className="link-bottom my-6">
                Did you forget your password? Reset it here
              </p>
            </div>
            <Button type="filled" link="#" label="Sign up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

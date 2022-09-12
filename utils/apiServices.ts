class ApiServices {
  constructor() {}

  private readonly BASE_URL = "https://safi-pay.herokuapp.com:443/";

  postRequest = async (
    endpoint: string,
    body: any,
    isProtected: boolean = false
  ) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const res = await fetch(`${this.BASE_URL}${endpoint}`, {
        headers: isProtected
          ? { ...headers, Authorization: this.getToken() }
          : headers,
        method: "POST",
        body: JSON.stringify(body),
        redirect: "follow"
      });



      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      console.log("ERROR");
      return null;
    }
  };

  getRequest = async (endpoint: string) => {
    try {
      const res = await fetch(`${this.BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log("ERROR");
      return null;
    }
  };

  putRequest = async () => {};

  getToken = () => {
    return localStorage.getItem("auth-token") ?? "";
  };
}

const serverInstance = new ApiServices();

export { serverInstance };
export default ApiServices;
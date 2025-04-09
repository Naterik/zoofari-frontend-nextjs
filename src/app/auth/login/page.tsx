import { auth } from "@/auth/auth";
import Login from "@/component/auth/login";

const LoginPage = async () => {
  const session = await auth();
  return <Login />;
};

export default LoginPage;

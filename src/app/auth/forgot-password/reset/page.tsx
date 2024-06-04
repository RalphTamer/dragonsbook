import ResetPassword from "~/app/_components/ResetPassword";
type PageProps = {
  searchParams: {
    token: string;
  };
};
const Reset = (props: PageProps) => {
  return <ResetPassword token={props.searchParams.token} />;
};

export default Reset;

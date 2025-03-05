import Verify from "@/component/auth/verify";

const VerifyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  // const id = (await params).id;
  const { id } = await params;
  return (
    <div>
      <Verify id={id} />
    </div>
  );
};

export default VerifyPage;

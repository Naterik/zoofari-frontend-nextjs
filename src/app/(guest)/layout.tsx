import GuestLayout from "@/component/layout.client/client.layout";

export default function GuestLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestLayout>{children}</GuestLayout>;
}

// app/auth/layout.tsx
export const metadata = { title: "Auth - Zoofari" };

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Không include header/footer
  return <div className="auth-wrapper">{children}</div>;
}

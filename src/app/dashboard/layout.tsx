import Navbar from "@/components/navbar/dashboard";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <>
        <Navbar />
        {children}
      </>
  );
};

export default RootLayout;

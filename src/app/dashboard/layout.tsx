import Navbar from "@/components/navbar";

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

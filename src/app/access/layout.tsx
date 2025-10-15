import GeneralNavbar from "@/components/navbar/general";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <GeneralNavbar />
      {children}
    </>
  );
};

export default RootLayout;

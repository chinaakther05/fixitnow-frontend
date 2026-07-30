import React from "react";

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* Navbar */}
      {children}
      {/* Footer */}
    </>
  );
};

export default PublicLayout;
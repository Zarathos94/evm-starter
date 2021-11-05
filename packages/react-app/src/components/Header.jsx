import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/austintgriffith/rally-assignment" target="_blank" rel="noopener noreferrer">
      <PageHeader title="🏗 rally-assignment" subTitle="a demo" style={{ cursor: "pointer" }} />
    </a>
  );
}

import React, { FC } from "react";
import SEO from "@/components/SEO/SEO";
import SiteHeader from "./SiteHeader";
import Footer from "@/components/Footer/Footer";
import { NcgeneralSettingsFieldsFragmentFragment } from "@/__generated__/graphql";

interface MenuItem {
  // Add properties based on your menu item structure
  id: string;
  title: string;
  url: string;
  // Add other relevant properties
}

interface Props {
  children: React.ReactNode;
  pageTitle?: string;
  headerMenuItems?: MenuItem[];
  footerMenuItems?: MenuItem[];
  pageFeaturedImageUrl?: string;
  generalSettings?: NcgeneralSettingsFieldsFragmentFragment;
  pageDescription?: string;
}

const PageLayout: FC<Props> = ({
  children,
  footerMenuItems = [],
  headerMenuItems = [],
  pageFeaturedImageUrl,
  pageTitle = "",
  generalSettings,
  pageDescription = "",
}) => {
  const siteTitle = generalSettings?.title || "";
  const siteDescription = generalSettings?.description || "";

  return (
    <>
      <SEO
        title={`${pageTitle} ${siteTitle ? `- ${siteTitle}` : ""}`.trim()}
        description={pageDescription || siteDescription}
        imageUrl={pageFeaturedImageUrl}
      />
      <SiteHeader
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={headerMenuItems}
      />
      <main>{children}</main>
      <Footer menuItems={footerMenuItems} />
    </>
  );
};

export default PageLayout;

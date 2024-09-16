import { gql } from "../__generated__"
import { GetPostSiglePageQuery } from "../__generated__/graphql"
import { FaustTemplate } from "@faustwp/core"
import PageLayout from "@/container/PageLayout"
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu"
import { useRouter } from "next/router"
import Sidebar from "@/container/singles/Sidebar"
import SingleContent from "@/container/singles/SingleContent"
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment"

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <div>Loading...</div>
  }

  const router = useRouter()
  const _post = props.data?.post || {}

  const {
    title,
    content,
    excerpt,
    featuredImage,
  } = getPostDataFromPostFragment(_post)

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      pageFeaturedImageUrl={featuredImage?.sourceUrl}
      pageTitle={title}
      pageDescription={excerpt || ""}
      generalSettings={props.data?.generalSettings}
    >
      <div className="container flex flex-col my-10 lg:flex-row">
        <div className="w-full lg:w-2/3 xl:pe-20">
          <SingleContent post={_post} />
        </div>
        <div className="w-full mt-12 lg:mt-0 lg:w-1/3">
          <Sidebar content={content || ''} />
        </div>
      </div>
    </PageLayout>
  )
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  }
}

Component.query = gql(`
  query GetPostSiglePage($databaseId: ID!, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      ...NcmazFcPostFullFields
    }
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: {location: $headerLocation}, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: {location: $footerLocation}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`)

export default Component

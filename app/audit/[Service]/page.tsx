import { notFound } from "next/navigation"
import ServiceDetailPage from "@/components/ServiceDetailPage"
import { serviceCategories } from "@/components/service-data"

type Props = {
  params: Promise<{
    service: string
  }>
}

export default async function AuditServicePage({ params }: Props) {
  const { service } = await params
  const category = serviceCategories.audit

  const item = category.services.find(
    (entry) => entry.slug === service,
  )

  if (!item) {
    notFound()
  }

  return (
    <ServiceDetailPage
      category={category}
      service={item}
    />
  )
}
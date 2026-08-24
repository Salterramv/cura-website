import ServiceHub from "@/components/ServiceHub"
import { serviceCategories } from "@/components/service-data"

export default function AuditPage() {
  return <ServiceHub service={serviceCategories.audit} />
}
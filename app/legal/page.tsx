import ServiceHub from "@/components/ServiceHub"
import { serviceCategories } from "@/components/service-data"

export default function LegalPage() {
  return <ServiceHub service={serviceCategories.legal} />
}
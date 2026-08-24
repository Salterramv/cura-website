import ServiceHub from "@/components/ServiceHub"
import { serviceCategories } from "@/components/service-data"

export default function AdvisoryPage() {
  return <ServiceHub service={serviceCategories.advisory} />
}
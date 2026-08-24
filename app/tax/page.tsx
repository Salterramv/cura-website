import ServiceHub from "@/components/ServiceHub"
import { serviceCategories } from "@/components/service-data"

export default function TaxPage() {
  return <ServiceHub service={serviceCategories.tax} />
}
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

export default function OtherServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CuraHeader />
      {children}
      <CuraFooter />
    </>
  )
}
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ApalyRx",
    url: "https://www.apalyrx.com",
    logo: "https://www.apalyrx.com/apalyrx-logo-full-color.png",
    description:
      "ApalyRx works alongside PBMs to independently route high-cost prescriptions in real time to the lowest net cost and documents every decision.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa",
      addressRegion: "FL",
      addressCountry: "US",
    },
    email: "sales@apalyrx.com",
    sameAs: ["https://www.linkedin.com/company/apalyrx"],
    knowsAbout: [
      "Pharmacy Benefit Management",
      "Prescription Routing",
      "Drug Benefit Integrity",
      "Pharmacy Benefits Verification",
      "GLP-1 Medications",
      "Manufacturer Direct Programs",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

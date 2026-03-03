interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
}

export default function WebPageSchema({
  title,
  description,
  url,
}: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    isPartOf: {
      "@type": "WebSite",
      name: "ApalyRx",
      url: "https://www.apalyrx.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ApalyRx",
      url: "https://www.apalyrx.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

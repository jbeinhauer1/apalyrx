interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
}

export default function ArticleSchema({ headline, description, url }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Organization",
      name: "ApalyRx",
      url: "https://www.apalyrx.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ApalyRx",
      url: "https://www.apalyrx.com",
    },
    url,
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

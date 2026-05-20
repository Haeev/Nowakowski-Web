type JsonLdScriptProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

const JsonLdScript = ({ data }: JsonLdScriptProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

export default JsonLdScript

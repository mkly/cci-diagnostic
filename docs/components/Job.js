import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import Details from "./Details.js"

export default ({
  id,
  job_number,
  name,
  started_at,
  stopped_at,
  status,
  type
}) => html`
  <details>
    <summary>Job: ${name}</summary>
    <p>
      <${Details} items=${{
        ID: id,
        Name: name,
        Number: job_number,
        Started: new Date(started_at).toString(),
        Stopped: new Date(stopped_at).toString(),
        Type: type,
        Status: status
      }}/>
    </p>
  </details>
`

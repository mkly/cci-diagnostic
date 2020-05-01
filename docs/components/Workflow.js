import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import Details from "./Details.js"
import Jobs from "./Jobs.js"

export default ({
  id,
  name,
  status,
  created_at,
  stopped_at,
  jobs
}) => html`
  <details>
    <summary>Workflow: ${name}</summary>
    <p>
      <${Details} items=${{
        ID: id,
        Name: name,
        Status: status,
        Created: new Date(created_at).toString(),
        Stopped: new Date(stopped_at).toString()
      }}/>
      <div><${Jobs} jobs=${jobs}/></div>
    </p>
  </details>
`

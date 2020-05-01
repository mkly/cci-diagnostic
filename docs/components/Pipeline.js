import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import Details from "./Details.js"
import Trigger from "./Trigger.js"
import Workflows from "./Workflows.js"

export default ({
  id,
  number,
  state,
  updated_at,
  created_at,
  trigger,
  workflows
}) => html`
  <details>
    <summary>Pipeline: #${number}</h3>
    <p>
      <${Details} items=${{
        ID: id,
        Number: number,
        State: state,
        Updated: new Date(updated_at).toString(),
        Created: new Date(created_at).toString()
      }}/>
      <div><${Trigger} ...${trigger}/></div>
      <div><${Workflows} workflows=${workflows}/></div>
    </p>
  </details>
`

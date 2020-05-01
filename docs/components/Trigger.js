import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import Actor from "./Actor.js"
import Details from "./Details.js"

export default ({
  received_at,
  type,
  actor
}) => html`
  <div>
    <h4>Trigger</h4>
    <${Details} items=${{
      "Received at": received_at,
      Type: type
    }}/>
    <div><${Actor} ...${actor}/></div>
  </div>
`

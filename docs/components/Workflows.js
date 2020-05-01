import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { css } from "../modules/emotion.js"
import Workflow from "./Workflow.js"

export default ({
  workflows
} = []) => html`
  <h3>Workflows</h3>
  <div>
    ${workflows.map(workflow => html`
      <${Workflow} ...${workflow}/>
    `)}
  </div>
`

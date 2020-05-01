import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { css } from "../modules/emotion.js"
import Pipeline from "./Pipeline.js"

export default (
  {pipelines} = []
) => html`
  <h3>Pipelines</h3>
  <div>
    ${pipelines.map(pipeline => html`
      <${Pipeline} ...${pipeline}/>
    `)}
  </div>
`

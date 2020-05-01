import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { css } from "../modules/emotion.js"
import BaseForm from "./BaseForm.js"
import Message from "./Message.js"

export default ({
  message,
  loadPipelines,
  handleApiTokenChange,
  handleProjectSlugChange
}) => html`
  <h1>CircleCI Diagnostic</h1>
  <${Message} message=${message}/>
  <${BaseForm}
    loadPipelines=${loadPipelines}
    handleApiTokenChange=${handleApiTokenChange}
    handleProjectSlugChange=${handleProjectSlugChange}
  />
`

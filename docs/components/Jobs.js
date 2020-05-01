import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import Job from "./Job.js"

export default ({
  jobs
} = []) => html`
  <div>
    <h3>Jobs</h3>
    ${jobs.map(job => html`
      <${Job} ...${job}/>
    `)}
  </div>
`

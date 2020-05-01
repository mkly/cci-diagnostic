import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import Details from "./Details.js"

export default ({
  avatar_url,
  login
}) => html`
  <div>
    <h4>Actor</h4>
    <${Details} items=${{
      "Avatar URL": avatar_url,
      Login: login
    }}/>
  </div>
`

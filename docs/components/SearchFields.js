import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

export default ({
  searchFields
}) => html`
  <details>
    <summary>Avaliable Search Fields</summary>
    <ul>
      ${searchFields.map(sf => html`
        <li>${sf}</li>
      `)}
    </ul>
  </details>
`

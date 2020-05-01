import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { css } from "../modules/emotion.js"

const listStyle = css`
  padding: 0;
  margin: 0;
`

const itemStyle = css`
  list-style-type: none;
`

export default ({
  items
}) => html`
  <ul className=${listStyle}>
    ${Object.keys(items).map(key => html`
      <li className=${itemStyle}>${key}: ${items[key]}</li>
    `)}
  </ul>
`

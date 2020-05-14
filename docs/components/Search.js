import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

export default ({
  handleSearchTermChange
}) => html`
  <form onSubmit=${e => e.preventDefault()}>
    <div>
      <label
        for="search"
      >Search</label>
      <input
        type="text"
        name="search"
        onChange=${handleSearchTermChange}
      />
      <button
        type="submit"
      >Search</button>
    </div>
  </form>
`

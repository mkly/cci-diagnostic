import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

export default ({
  loadPipelines,
  handleApiTokenChange,
  handleProjectSlugChange
}) => html`
  <form onSubmit=${loadPipelines}>
    <div>
    <label
      for="api-token"
    >API Token</label>
      <input
        type="text"
        name="api-token"
        onChange=${handleApiTokenChange}
      />
    </div>
    <div>
      <label
        for="slug"
      >Project Slug</label>
      <input
        type="text"
        name="slug"
        onChange=${handleProjectSlugChange}
      />
    </div>
    <button
      type="submit"
    >Go</button>
  </form>
`

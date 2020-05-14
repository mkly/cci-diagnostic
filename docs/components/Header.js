import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { css } from "../modules/emotion.js"
import BaseForm from "./BaseForm.js"
import Message from "./Message.js"
import Search from "./Search.js"
import SearchFields from "./SearchFields.js"

export default ({
  message,
  loadPipelines,
  handleApiTokenChange,
  handleProjectSlugChange,
  handleSearchTermChange,
  showSearch,
  searchFields
}) => html`
  <h1>CircleCI Diagnostic</h1>
  <${Message} message=${message}/>
  <${BaseForm}
    loadPipelines=${loadPipelines}
    handleApiTokenChange=${handleApiTokenChange}
    handleProjectSlugChange=${handleProjectSlugChange}
  />
  ${showSearch && html`
    <div>
      <${Search}
        handleSearchTermChange=${handleSearchTermChange}
      />
      <${SearchFields} searchFields=${searchFields}/>
    </div>
  `}
`

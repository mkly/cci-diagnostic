import { html, Component } from "https://unpkg.com/htm/preact/standalone.module.js"

import { getPipelines } from "../api/index.js"
import { buildIndex } from "../search/index.js"
import Header from "./Header.js"
import PipelinesList from "./PipelinesList.js"

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiToken: undefined,
      projectSlug: undefined,
      message: undefined,
      pipelines: [],
      idx: {
        search: () => ['nooo']
      },
      searchTerm: "",
      searchFields: [],
      initialized: false
    }
  }

  async loadPipelines (apiToken, projectSlug) {
    await this.setState({
      ...this.state,
      message: "Downloading pipelines..."
    });

    try {
      const pipelines = await getPipelines(apiToken, projectSlug)
      const [idx, searchFields] = buildIndex(pipelines)

      this.setState({
        ...this.state,
        message: undefined,
        pipelines,
        allPipelines: pipelines,
        initialized: true,
        searchFields,
        idx
      })

    } catch (e) {
      return this.setState({
        ...this.state,
        message: `Unable to download pipelines: ${e}`
      })
    }
  }

  handleApiTokenChange ({target: {value} = {}}) {
    this.setState({
      ...this.state,
      apiToken: value
    })
  }

  handleProjectSlugChange ({target: {value} ={}}) {
    this.setState({
      ...this.state,
      projectSlug: value
    })
  }

  handleSearchTermChange ({target: {value} = {}}) {
    this.setState({
      ...this.state,
      message: undefined,
      searchTerm: value
    })

    if (value.length === 0) {
      this.setState({
        ...this.state,
        pipelines: this.state.allPipelines
      })

      return;
    }

    try {
      const results = this.state.idx.search(value).reduce((a, c) => {
        a[c.ref] = true

        return a
      }, {})

      const filtered = this.state.allPipelines.filter(p => {
        return results[p.id] !== undefined
      })

      this.setState({
        ...this.state,
        pipelines: filtered
      })
    } catch (e) {
      this.setState({
        ...this.state,
        message: `Error in search: ${e}`
      })
    }
  }

  render (_props, {
    apiToken,
    projectSlug,
    message,
    pipelines,
    searchTerm,
    searchFields,
    initialized
  }) {
    return html`
      <div>
        <${Header}
          message=${message}
          loadPipelines=${e => e.preventDefault() || this.loadPipelines(apiToken, projectSlug)}
          handleApiTokenChange=${event => this.handleApiTokenChange(event)}
          handleProjectSlugChange=${event => this.handleProjectSlugChange(event)}

          handleSearchTermChange=${e => this.handleSearchTermChange(e)}
          showSearch=${initialized}
          searchFields=${searchFields}
        />
        <${PipelinesList} pipelines=${pipelines}/>
      </div>
    `
  }
}

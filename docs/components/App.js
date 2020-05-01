import { html, Component } from "https://unpkg.com/htm/preact/standalone.module.js"

import { getPipelines } from "../api/index.js"
import Header from "./Header.js"
import PipelinesList from "./PipelinesList.js"

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiToken: undefined,
      projectSlug: undefined,
      message: undefined,
      pipelines: []
    }
  }

  async loadPipelines (apiToken, projectSlug) {
    await this.setState({
      ...this.state,
      message: "Downloading pipelines..."
    });

    try {
      const pipelines = await getPipelines(apiToken, projectSlug)

      this.setState({
        ...this.state,
        message: undefined,
        pipelines: pipelines
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

  render (_props, {
    apiToken,
    projectSlug,
    message,
    pipelines
  }) {
    return html`
      <div>
        <${Header}
          message=${message}
          loadPipelines=${e => e.preventDefault() || this.loadPipelines(apiToken, projectSlug)}
          handleApiTokenChange=${event => this.handleApiTokenChange(event)}
          handleProjectSlugChange=${event => this.handleProjectSlugChange(event)}
        />
        <${PipelinesList} pipelines=${pipelines}/>
      </div>
    `
  }
}

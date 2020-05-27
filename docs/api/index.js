export const getPipelines = async (apiToken, projectSlug, pipelines=[], maxPages=10, currentPage=0, nextPageToken=undefined) => {
  const resp = await fetch(`https://circleci.com/api/v2/project/${projectSlug}/pipeline?circle-token=${apiToken}${nextPageToken ? `&page-token=${nextPageToken}` : ""}`)
  if (resp.status !== 200) {
    throw `${resp.status} ${resp.statusText}`
  }
  const data = await resp.json()
  const pipelinesWithWorkflows = await Promise.all(data.items.map(async p => {
    const workflows = await getWorkflows(apiToken, p.id)
    return {
      ...p,
      workflows
    }
  }))

  if (!data.next_page_token || currentPage >= maxPages) {
    return [...pipelines, ...pipelinesWithWorkflows]
  }

  return getPipelines(apiToken, projectSlug, [...pipelines, ...pipelinesWithWorkflows], maxPages, ++currentPage, data.next_page_token)
}


export const getWorkflows = async (apiToken, pipelineId, workflows=[], maxPages=10, currentPage=0, nextPageToken=undefined) => {
  const resp = await fetch(`https://circleci.com/api/v2/pipeline/${pipelineId}/workflow?circle-token=${apiToken}${nextPageToken ? `&page-token=${nextPageToken}` : ""}`)
  if (resp.status !== 200) {
    throw `${resp.status} ${resp.statusText}`
  }
  const data = await resp.json()
  const workflowsWithJobs = await Promise.all(data.items.map(async w => {
    const jobs = await getJobs(apiToken, w.id)
    return {
      ...w,
      jobs
    }
  }))

  if (!data.next_page_token || currentPage >= maxPages) {
    return [...workflows, ...workflowsWithJobs]
  }

  return getPipelines(apiToken, pipelineId, [...workflows, ...workflowsWithJobs], maxPages, ++currentPage, data.next_page_token)
}

export const getJobs = async (apiToken, workflowId, jobs=[], maxPages=10, currentPage=0, nextPageToken=undefined) => {
  const resp = await fetch(`https://circleci.com/api/v2/workflow/${workflowId}/job?circle-token=${apiToken}${nextPageToken ? `&page-token=${nextPageToken}` : ""}`)
  if (resp.status !== 200) {
    throw `${resp.status} ${resp.statusText}`
  }
  const data = await resp.json()
  if (!data.next_page_token || currentPage >= maxPages) {
    return [...jobs, ...data.items]
  }

  return getPipelines(apiToken, workflowId, [...jobs, ...data.items], maxPages, ++currentPages, data.next_page_token)
}

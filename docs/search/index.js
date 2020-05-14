import { lunr } from "../modules/lunr.js"

export const buildIndex = pipelines => {
  let fieldsAdded = {}
  const idx = lunr(function() {
    const me = this
    this.ref("refid")
    this.pipeline.remove(lunr.stopWordFilter)
    pipelines.map(pipeline => {
      const pDoc = {}
      const pId = pipeline.id
      Object.entries(pipeline).map(([pKey, pValue]) => {
        if (pKey === "workflows") {
          pValue.map(workflow => {
            const wDoc = {}
            Object.entries(workflow).map(([wKey, wValue]) => {
              if (wKey === "jobs") {
                wValue.map(job => {
                  const jDoc = {}
                  Object.entries(job).map(([jKey, jValue]) => {
                    if (jKey !== "canceled_by" && jKey !== 'stopped_at' && jKey !== 'completed_at' && (typeof jValue === "string" || typeof jValue === "number")) {
                      const prefixJKey = `job_${jKey}`
                      if (fieldsAdded[prefixJKey] === undefined) {
                        me.field(prefixJKey)
                        fieldsAdded[prefixJKey] = true
                      }
                      jDoc[prefixJKey] = jValue
                    }
                  })
                  // All jobs are indexed to the pipeline id
                  jDoc.refid = pId
                  me.add(jDoc)
                })
              } else if (wKey !== "canceled_by" && wKey !== 'stopped_at' && wKey !== 'completed_at' && (typeof wValue === "string" || typeof wValue === "number")) {
                const prefixWKey = `workflow_${wKey}`
                if (fieldsAdded[prefixWKey] === undefined) {
                  me.field(prefixWKey)
                  fieldsAdded[prefixWKey] = true
                }
                wDoc[prefixWKey] = wValue
              }
            })
            // All workflows are indexed to the pipeline id
            wDoc.refid = pId
            me.add(wDoc)
          })
        } else if (typeof pValue === "string" || typeof pValue === "number") {
          const prefixPKey = `pipeline_${pKey}`
          if (fieldsAdded[prefixPKey] === undefined) {
            me.field(prefixPKey)
            fieldsAdded[prefixPKey] = true
          }
          pDoc[prefixPKey] = pValue
        } else if (pKey === "trigger" && pValue.type !== undefined) {
          const triggerTypeKey = "pipeline_trigger_type"
          if (fieldsAdded[triggerTypeKey] === undefined) {
            me.field(triggerTypeKey)
            fieldsAdded[triggerTypeKey] = true
          }
          pDoc[triggerTypeKey] = pValue.type.trim()
          if (pValue.actor && pValue.actor.login) {
            const triggerActorKey = "pipeline_trigger_actor_login"
            if (fieldsAdded[triggerActorKey] === undefined) {
              me.field(triggerActorKey)
              fieldsAdded[triggerActorKey] = true
            }
            pDoc[triggerActorKey] = pValue.actor.login
          }
        }
      })
      pDoc.refid = pId
      me.add(pDoc)
    })
  })

  return [idx, Object.keys(fieldsAdded)]
}

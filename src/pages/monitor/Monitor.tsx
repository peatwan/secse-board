import { useProjectStore } from 'utils/store'

const Monitor = () => {
  const { path: projectPath, status: projectCreated } = useProjectStore()

  return (
    <div>
      <span>path: {projectPath}</span>
      <span>created: {projectCreated}</span>
    </div>
  )
}
export default Monitor

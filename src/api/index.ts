import list from './list'
import updates from './update'
type apiProps = keyof typeof apis
const apis = {
    ...list,
    ...updates
}
export default apis
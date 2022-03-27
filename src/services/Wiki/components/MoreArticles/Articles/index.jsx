import Container from "./Container"
import PropTypes from "prop-types"

Container.propTypes = {
  children: PropTypes.node,
  categoryName: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
}

export default Container

import PropTypes from "prop-types"
const Helmet = (props) => {
    document.title = 'logo -' + props.title
    return (
        <div>
            {props.children}
        </div>
    );
};


Helmet.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
}
export default Helmet;
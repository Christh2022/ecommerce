import PropTypes from "prop-types";
import classes from './css/commonsection.module.css'
const  CommonSection = ({title})=> {
    return (
        <section className={classes.commonSection}>
            <h1>{title}</h1>
        </section>
    )
}

CommonSection.propTypes = {
    title: PropTypes.string.isRequired,
};

export default CommonSection

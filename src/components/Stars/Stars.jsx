import PropTypes from "prop-types";

const Stars = ({ note }) => {

    // Calculer la largeur d'une étoile en fonction de la note moyenne
    const starsWidth = (note * 100) / 5;

    // Style pour les étoiles en fonction de la note moyenne
    const styleStars = {
        width: `${starsWidth}% `,
        backgroundPosition: `${starsWidth}% 0`,
        display: "inline-block",
        color: "transparent",
        webkitTextStroke: ".7px orange",
        backgroundImage: "linear-gradient(orange, orange)",
        backgroundRepeat: "no-repeat",
        backgroundClip: "text",
        webkitBackgroundClip: "text",
    };

    
    return <span style={styleStars}>★★★★★</span>;
};

Stars.propTypes = {
    note: PropTypes.number,
};

export default Stars;

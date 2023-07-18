import classes from "./service.module.css";
import serviceData from "../assets/Data/serviceData";

const Services = () => {
    const { data } = serviceData();
    return (
        <section className={classes.services}>
            <ul>
                {data.map((value) => (
                    <li
                        key={value.id}
                        className={classes.service_item}
                        style={{ background: `${value.bg}` }}
                    >
                        <div className={classes.contain}>
                            <span>
                                <value.icon />
                            </span>
                            <div>
                                <h3>{value.title}</h3>
                                <p>{value.subtitle}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Services;

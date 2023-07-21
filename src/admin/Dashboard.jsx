import style from './css/dashboard.module.css'

const Dashboard = () => {
    return (
        <div className={style.container}>
            <div className={style.rows}>
                <div className={style.col}>
                    <span>Revenu</span>
                    <h5>700€</h5>
                </div>
                <div className={style.col}>
                    <span>Revenu</span>
                    <h5>700€</h5>
                </div>
                <div className={style.col}>
                    <span>Revenu</span>
                    <h5>700€</h5>
                </div>
                <div className={style.col}>
                    <span>Revenu</span>
                    <h5>700€</h5>
                </div>
            </div>

            <div className={style.order} >
                <h4>Liste des commandes</h4>
                <table>
                    <thead>
                        <tr>
                            <th>image</th>
                            <th>titre</th>
                            <th>Prix</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>image</td>
                            <td>creme</td>
                            <td>100€</td>
                            <td>Livré</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

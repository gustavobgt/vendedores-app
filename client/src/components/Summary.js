import React, { useEffect } from 'react';

import { formatMoney } from '../helpers/formatHelpers';

import css from './summary.module.css';
import M from 'materialize-css';

export default function Summary({ summary }) {
  useEffect(() => {
    const elemsCollapsible = document.querySelectorAll('.collapsible');
    const instancesCollapsible = M.Collapsible.init(elemsCollapsible);
  }, []);

  const { countTransactions, totalEarnings, totalExpenses, balance } = summary;

  const percentage = (totalExpenses / totalEarnings) * 100;

  return (
    <div className="container">
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">
            <i class="material-icons">insert_chart</i>Resumo
          </div>
          <div class="collapsible-body">
            <div className="row">
              <div className="col s12 m6 l3 center-align">
                <div className={`card ${css.card} ${css.firstAndThirdCard}`}>
                  <div className="card-content">
                    <i className="material-icons small">attach_money</i>
                    <p>Lucro Operacional</p>
                    <h5>{formatMoney(totalEarnings)}</h5>
                  </div>
                  <div className="card-action">
                    <a href="#">Mais detalhes</a>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l3 center-align">
                <div className={`card ${css.card} ${css.secondAndFourthCard}`}>
                  <div className="card-content">
                    <i className="material-icons small">money_off</i>
                    <p>Despesas</p>
                    <h5>{formatMoney(totalExpenses)}</h5>
                  </div>
                  <div className="card-action">
                    <a href="#">Mais detalhes</a>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l3 center-align">
                <div className={`card ${css.card} ${css.firstAndThirdCard}`}>
                  <div className="card-content">
                    <i className="material-icons small">monetization_on</i>
                    <p>Lucro líquido</p>
                    <h5>{formatMoney(balance)}</h5>
                  </div>
                  <div className="card-action">
                    <a href="#">Mais detalhes</a>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l3 center-align">
                <div className={`card ${css.card} ${css.secondAndFourthCard}`}>
                  <div className="card-content">
                    <i className="material-icons small">money_off</i>
                    <p>Despesas / L.O.</p>
                    <h5>{`${percentage.toFixed(2)} %`}</h5>
                  </div>
                  <div className="card-action">
                    <a href="#">Mais detalhes</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

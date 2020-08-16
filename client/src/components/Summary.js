import React from 'react';

import { formatMoney } from '../helpers/formatHelpers';

import css from './summary.module.css';

export default function Summary({ summary }) {
  const { countTransactions, totalEarnings, totalExpenses, balance } = summary;

  const percentage = (totalExpenses / totalEarnings) * 100;

  return (
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
            <p>Despesas c/ remuneração</p>
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
            <p>Percentual Despesas sobre L.O.</p>
            <h5>{`${percentage.toFixed(2)} %`}</h5>
          </div>
          <div className="card-action">
            <a href="#">Mais detalhes</a>
          </div>
        </div>
      </div>
    </div>
  );
}

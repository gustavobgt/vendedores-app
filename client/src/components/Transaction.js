import React, { useState, useEffect } from 'react';
import { formatMoney } from '../helpers/formatHelpers';
import Action from './Action';

import css from './Transaction.module.css';
import M from 'materialize-css';

const EARNING_COLOR = '#A1F0DC';
const EXPENSE_COLOR = '#F0A1A8';

export default function Transaction({
  transaction,
  onDelete,
  onEdit,
  differentDay,
}) {
  useEffect(() => {
    const elemsTabs = document.querySelectorAll('.tabs');
    const instancesTabs = M.Tabs.init(elemsTabs, {});
  }, []);

  const {
    id,
    description,
    score,
    net_income,
    employee_expenses,
    category,
    amountOfSales,
  } = transaction;

  const handleActionClick = (type) => {
    if (type === 'edit') {
      onEdit(id);
      return;
    }

    if (type === 'delete') {
      onDelete(id);
      return;
    }
  };

  const {
    transactionStyle,
    earningStyle,
    expenseStyle,
    containerStyle,
    dateStyle,
    descriptionValueStyle,
    dataStyle,
    categoryStyle,
    descriptionStyle,
    valueStyle,
    actionsStyle,
  } = styles;

  const typeStyle =
    transaction.net_income < transaction.employee_expenses
      ? expenseStyle
      : earningStyle;
  const circleStyle =
    transaction.net_income < transaction.employee_expenses
      ? 'btn-floating btn-medium waves-effect waves-light red'
      : 'btn-floating btn-medium waves-effect waves-light';
  const modifiedScore = `${score.toString().padStart(2, '0')}`;

  const cardSellID = `vendas${id}`;
  const cardNetIncomeID = `lucro-liquido${id}`;
  const cardsalaryID = `salario${id}`;

  return (
    <div className="col s12 m6">
      <div className={`card small  ${css.card}`}>
        <div className="card-content">
          <div style={descriptionValueStyle}>
            <Action type="edit" onActionClick={handleActionClick} />
            <h5 className="center">{category}</h5>
            <Action type="delete" onActionClick={handleActionClick} />
          </div>

          <div className="divider"></div>
          <div className="center">
            <p>Pontuação:</p>
            <a className={circleStyle} style={dateStyle}>
              {modifiedScore}
            </a>
          </div>
        </div>

        <div className="card-tabs">
          <ul className="tabs tabs-fixed-width">
            <li className="tab">
              <a href={`#${cardSellID}`}>Vendas</a>
            </li>
            <li className="tab">
              <a href={`#${cardNetIncomeID}`}>L.L.</a>
            </li>
            <li className="tab">
              <a href={`#${cardsalaryID}`}>SALÁRIO</a>
            </li>
          </ul>
        </div>

        <div className="card-content grey lighten-4">
          <div className="center" id={cardSellID}>
            <span style={{ marginRight: '5px' }}>
              <i className="small material-icons">directions_car</i>
            </span>
            <span style={dateStyle}>{amountOfSales}</span>
          </div>
          <div className="center" id={cardNetIncomeID}>
            <span style={{ marginRight: '5px' }}>
              <i className="small material-icons">attach_money</i>
            </span>
            <span style={dateStyle}>{formatMoney(net_income)}</span>
          </div>
          <div className="center" id={cardsalaryID}>
            <span style={{ marginRight: '5px' }}>
              <i className="small material-icons">money_off</i>
            </span>
            <span style={dateStyle}>{formatMoney(employee_expenses)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  containerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
    minWidth: '250px',
  },

  transactionStyle: {
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
  },

  expenseStyle: {
    backgroundColor: EXPENSE_COLOR,
  },

  earningStyle: {
    backgroundColor: EARNING_COLOR,
  },

  dateStyle: {
    fontSize: '1.2rem',
  },

  descriptionValueStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dataStyle: {
    display: 'flex',
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categoryStyle: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },

  sellerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },

  descriptionStyle: {
    fontSize: '1.1rem',
  },

  valueStyle: {
    textAlign: 'right',
    fontFamily: 'Consolas, monospace',
    fontSize: '1.8rem',
  },

  actionsStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

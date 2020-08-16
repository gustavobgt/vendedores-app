import React from 'react';
import Transaction from './Transaction';

export default function Transactions({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const handleDelete = (id) => {
    onDeleteTransaction(id);
  };

  const handleEdit = (id) => {
    onEditTransaction(id);
  };

  let currentDay = 1;

  return (
    <div className="row" style={{ border: '1px solid red' }}>
      <div className="col s12">
        {transactions
          .sort((a, b) => {
            return b.score - a.score;
          })
          .map((transaction) => {
            const { id, score } = transaction;

            let differentDay = false;
            if (score !== currentDay) {
              differentDay = true;
              currentDay = score;
            }

            return (
              <Transaction
                key={id}
                transaction={transaction}
                onDelete={handleDelete}
                onEdit={handleEdit}
                differentDay={differentDay}
              />
            );
          })}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

/**
 * Interface com API
 */
import * as api from './api/apiService';

/**
 * Componentes
 */
import PeriodSelector from './components/PeriodSelector';
import Transactions from './components/Transactions';
import Summary from './components/Summary';
import Actions from './components/Actions';
import ModalTransaction from './components/ModalTransaction';
import Spinner from './components/Spinner';

import M from 'materialize-css';
import css from './app.css';

import logoImg from './assets/images/maracar-logo.png';

function sortTransactions(transactions) {
  return transactions.sort((a, b) =>
    a.yearMonthDay.localeCompare(b.yearMonthDay)
  );
}

const APP_VERSION = 'v1.0.6';

function getCurrentPeriod(allPeriods) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
  const currentPeriod = allPeriods.find(({ id }) => id === yearMonth);

  return currentPeriod || Object.assign({}, allPeriods[0]);
}

export default function App() {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState('');

  const [summary, setSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Materialize css init
  useEffect(() => {
    const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    const instancesDropdown = M.Dropdown.init(elemsDropdown, {
      coverTrigger: false,
    });

    const elemsSidenav = document.querySelectorAll('.sidenav');
    const instancesSidenav = M.Sidenav.init(elemsSidenav, {
      edge: 'left',
    });
  }, []);

  useEffect(() => {
    const getAllPeriods = async () => {
      const data = await api.getAllPeriods();
      setAllPeriods(data);

      setCurrentPeriod(getCurrentPeriod(data));
    };

    getAllPeriods();

    /**
     * Título da aba
     */
    document.title = `CFP ${APP_VERSION}`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentPeriod) {
        return;
      }

      setCurrentTransactions([]);
      const transactions = await api.getTransactionsFrom(currentPeriod);
      setCurrentTransactions(transactions);
    };

    fetchData();
  }, [currentPeriod]);

  useEffect(() => {
    if (filterText.trim() === '') {
      setFilteredTransactions([...currentTransactions]);
    } else {
      const lowerCaseFilter = filterText.toLowerCase();

      const newFilteredTransactions = currentTransactions.filter(
        (transaction) => {
          return transaction.descriptionLowerCase.includes(lowerCaseFilter);
        }
      );

      setFilteredTransactions(newFilteredTransactions);
    }
  }, [filterText, currentTransactions]);

  useEffect(() => {
    const summarizeData = () => {
      const countTransactions = filteredTransactions.length;

      const totalEarnings = filteredTransactions.reduce(
        (totalEarnings, transaction) => {
          return totalEarnings + transaction.net_income;
        },
        0
      );

      const totalExpenses = filteredTransactions.reduce(
        (totalExpenses, transaction) => {
          return totalExpenses + transaction.employee_expenses;
        },
        0
      );

      const balance = totalEarnings - totalExpenses;

      setSummary({
        countTransactions,
        totalEarnings,
        totalExpenses,
        balance,
      });
    };

    summarizeData();
  }, [filteredTransactions]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const handleFilter = (filteredText) => {
    setFilterText(filteredText);
  };

  const handleDeleteTransaction = async (id) => {
    await api.deleteTransaction(id);

    const newTransactions = currentTransactions.filter(
      (transaction) => transaction.id !== id
    );

    setCurrentTransactions(newTransactions);
    setFilteredTransactions(newTransactions);
  };

  const handleEditTransaction = (id) => {
    const newSelectedTransaction = currentTransactions.find(
      (transaction) => transaction.id === id
    );

    setSelectedTransaction(newSelectedTransaction);
    setIsModalOpen(true);
  };

  const handleInsertTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleModalSave = async (newTransaction, mode) => {
    setIsModalOpen(false);

    if (mode === 'insert') {
      const postedTransaction = await api.postTransaction(newTransaction);

      let newTransactions = [...currentTransactions, postedTransaction];
      newTransactions = sortTransactions(newTransactions);
      setCurrentTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setSelectedTransaction(null);

      return;
    }

    if (mode === 'edit') {
      const updatedTransaction = await api.updateTransaction(newTransaction);
      const newTransactions = [...currentTransactions];

      const index = newTransactions.findIndex(
        (transaction) => transaction.id === newTransaction.id
      );

      newTransactions[index] = updatedTransaction;
      setCurrentTransactions(newTransactions);
      setFilteredTransactions(newTransactions);

      return;
    }
  };

  return (
    <div className="main">
      <header>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper light-blue darken-4">
              <div className="container">
                <a href="#" className="center brand-logo">
                  <h5>Grupo Gama</h5>
                </a>

                <a
                  href="#"
                  data-target="mobile-navbar"
                  className="sidenav-trigger"
                >
                  <i className="material-icons">menu</i>
                </a>

                <ul id="navbar-items" className="hide-on-med-and-down">
                  <li>
                    <a
                      className="dropdown-trigger light-blue darken-4"
                      data-target="dropdown-menu"
                      href="#"
                    >
                      Empresa{' '}
                      <i className="material-icons right">arrow_drop_down</i>
                    </a>
                  </li>
                </ul>

                <ul id="dropdown-menu" className="dropdown-content">
                  <li>
                    <a href="#">Maracar</a>
                  </li>
                  <li>
                    <a href="#">Audi</a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a href="#">Renault</a>
                  </li>
                  <li>
                    <a href="#">Ford</a>
                  </li>
                  <li>
                    <a href="#">Volvo</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <ul id="mobile-navbar" className="sidenav">
          <li className="center">
            <h5>Empresas</h5>
          </li>
          <li>
            <a href="#">Maracar</a>
          </li>
          <li>
            <a href="#">Audi</a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#">Renault</a>
          </li>
          <li>
            <a href="#">Ford</a>
          </li>
          <li>
            <a href="#">Volvo</a>
          </li>
        </ul>
      </header>

      <div className="center">
        <img width="280px" src={logoImg} alt="Logo Maracar" />
      </div>

      <div id="logo-div" className="container center"></div>

      <div className="center">
        <h4>Remuneração de vendedores</h4>
      </div>

      {!isModalOpen && (
        <PeriodSelector
          allPeriods={allPeriods}
          selectedPeriod={currentPeriod}
          onChangePeriod={handlePeriodChange}
        />
      )}

      {currentTransactions.length === 0 && <Spinner>Aguarde...</Spinner>}

      {currentTransactions.length > 0 && (
        <>
          <Summary summary={summary} />
          <div div className="container">
            {!isModalOpen && (
              <Actions
                filterText={filterText}
                onFilter={handleFilter}
                isModalOpen={isModalOpen}
                onNewTransaction={handleInsertTransaction}
              />
            )}

            <Transactions
              transactions={filteredTransactions}
              onDeleteTransaction={handleDeleteTransaction}
              onEditTransaction={handleEditTransaction}
            />
          </div>
        </>
      )}

      {isModalOpen && (
        <ModalTransaction
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleModalSave}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
